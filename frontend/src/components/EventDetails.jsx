import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Col,
  Container,
  Row,
  Table,
  Alert,
  Spinner,
  Button,
  Collapse,
} from "reactstrap";
import "../styles/EventDetails.css";
import formatDate from "../functions/formatDate";
import { capitalize } from "../functions/stringFunctions";

export const EventDetails = () => {
  const { id } = useParams();
  const baseUrl = "http://localhost:8000/events/";
  const eventUrl = baseUrl + `events/${id}/`;
  const [details, setDetails] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authorized, setAuthorized] = useState(true);
  const [subscribers, setSubscribers] = useState([]);
  const [showSubscribers, setShowSubscribers] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(eventUrl);
      const data = await response.json();
      const [formattedDate, formattedTime] = formatDate(data.date);
      const hostResponse = await fetch(baseUrl + `users/${data.creator}/`);
      const hostData = await hostResponse.json();
      const subscribersResponse = await fetch(eventUrl + "subscribers/");
      const subscribersData = await subscribersResponse.json();
      setIsLoading(false);
      setDetails({
        title: data.title,
        location: data.location,
        date: formattedDate,
        time: formattedTime,
        host: `${hostData.first_name} ${hostData.last_name}`,
      });
      setImgUrl(data.img_url);
      setSubscribers(subscribersData);
    } catch (e) {
      setIsLoading(false);
      setAuthorized(false);
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
    return setDetails(null);
  }, [eventUrl]);

  const subscribe = async () => {
    try {
      const response = await fetch(eventUrl + "subscribers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {},
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleSubscribers = () => setShowSubscribers(!showSubscribers);

  return (
    <Container className="event-details">
      <h1>Event Details</h1>
      {isLoading && (
        <div className="spinner-container">
          <Spinner color="info" className="spinner" type="grow" />
        </div>
      )}
      {details && (
        <>
          <Row xs="1" sm="2">
            <Col>
              <img src={imgUrl} />
            </Col>
            <Col>
              <Table borderless>
                <tbody>
                  {Object.entries(details).map(([detail, value]) => {
                    return (
                      <tr key={value}>
                        <th scope="row">{capitalize(detail)}</th>
                        <td>{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Button color="success" onClick={subscribe}>
                Subscribe to event
              </Button>
            </Col>
          </Row>
          <Row xs="1">
            <Col>
              <Button onClick={toggleSubscribers} color="info">
                See attendants
              </Button>
              <Collapse isOpen={showSubscribers}>
                <Table className="table-info" striped>
                  <thead>
                    <tr>
                      <th> </th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>username</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s) => (
                      <tr>
                        <td>
                          <img
                            src={s.img_url}
                            alt=""
                            className="subscribers-pic"
                          />
                        </td>
                        <td>{s.first_name}</td>
                        <td>{s.last_name}</td>
                        <td>{s.username}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Collapse>
            </Col>
          </Row>
        </>
      )}
      {authorized || (
        <Alert color="danger">
          You are not authorized to see this content.
        </Alert>
      )}
    </Container>
  );
};

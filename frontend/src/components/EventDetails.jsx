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
  Badge,
} from "reactstrap";
import "../styles/EventDetails.css";
import formatDate from "../functions/formatDate";
import { capitalize } from "../functions/stringFunctions";
import { EventModal } from "./EventModal";

export const EventDetails = ({ user, token }) => {
  const { id } = useParams();
  const baseUrl = "http://localhost:8000/events/";
  const eventUrl = baseUrl + `events/${id}/`;
  const [details, setDetails] = useState(null);
  const [event, setEvent] = useState({});
  const [eventModal, setEventModal] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authorized, setAuthorized] = useState(true);
  const [subscribers, setSubscribers] = useState([]);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  let headers = {};
  if (token) {
    headers = {
      Authorization: `Token ${token}`,
    };
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(eventUrl, {
        headers: headers,
      });
      const data = await response.json();
      setEvent(data);
      console.log("event:", data);
      const [formattedDate, formattedTime] = formatDate(data.date);
      const hostResponse = await fetch(baseUrl + `users/${data.creator}/`, {
        headers: headers,
      });
      const hostData = await hostResponse.json();
      const subscribersResponse = await fetch(eventUrl + "subscribers/", {
        headers: headers,
      });
      const subscribersData = await subscribersResponse.json();
      setIsLoading(false);

      setDetails({
        title: data.title,
        location: data.location,
        date: formattedDate,
        time: formattedTime,
        host: `${hostData.first_name} ${hostData.last_name}`,
        status:
          data.status === "PB"
            ? "Public"
            : event.status === "DR"
            ? "Draft"
            : "Private",
      });
      setImgUrl(`https://picsum.photos/id/${data.id}/400/400`);
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
  }, [eventUrl, subscriptionSuccess, eventModal]);

  const subscribe = async () => {
    try {
      const response = await fetch(eventUrl + "subscribers/", {
        method: "POST",
        headers: headers,
      });
      if (response.status == 200) {
        setSubscriptionSuccess(true);
        setTimeout(() => {
          setSubscriptionSuccess(false);
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleSubscribers = () => setShowSubscribers(!showSubscribers);

  const toggleEventModal = () => {
    setEventModal(!eventModal);
  };

  const handleUpdate = () => {
    setUpdateSuccess(true);
    setTimeout(() => {
      setUpdateSuccess(false);
    }, 2000);
  };

  return (
    <Container className="event-details">
      <Row className="mt-2">
        <Col>
          <h1>Event Details</h1>
          {isLoading && (
            <div className="spinner-container">
              <Spinner color="info" className="spinner" type="grow" />
            </div>
          )}
        </Col>
      </Row>
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
              <div className="d-flex gap-3">
                <Button color="info" onClick={subscribe}>
                  Subscribe to event
                </Button>
                {(user?.is_superuser || event.creator === user?.id) && (
                  <Button color="info" outline onClick={toggleEventModal}>
                    Edit event
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          {subscriptionSuccess && (
            <Row>
              <Alert color="success" className="mt-3">
                You are now subscribed to this event.
              </Alert>
            </Row>
          )}
          {updateSuccess && (
            <Row>
              <Alert color="success" className="mt-3">
                Event details updated successfully.
              </Alert>
            </Row>
          )}
          <Row xs="1">
            <Col>
              <Button
                onClick={toggleSubscribers}
                color="info"
                outline
                className="mt-3"
              >
                See attendants
                <Badge className="ms-2" color="info">
                  {subscribers.length}
                </Badge>
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
                      <tr key={s.username}>
                        <td>
                          <img
                            src={`https://picsum.photos/id/${s.id}/400/400`}
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
      <EventModal
        isOpen={eventModal}
        toggle={toggleEventModal}
        event={event}
        token={token}
        onUpdate={handleUpdate}
      />
    </Container>
  );
};

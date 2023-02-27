import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Container, Row, Table, Alert, Spinner } from "reactstrap";
import "../styles/UserDetails.css";
import { camelToHuman } from "../functions/stringFunctions";

// view to show the user details
export const UserDetails = () => {
  const { id } = useParams();
  const baseUrl = "http://localhost:8000/events/";
  const userUrl = baseUrl + `users/${id}/`;
  const [details, setDetails] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authorized, setAuthorized] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(userUrl);
      const data = await response.json();
      setIsLoading(false);
      setDetails({
        username: data.username,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
      });
      setAuthorized(true);
      setImgUrl(`https://picsum.photos/id/${data.id}/400/400`);
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
  }, [userUrl]);

  return (
    <Container className="user-details">
      <Row className="mt-3">
        <Col>
          <h1>User Details</h1>
          {isLoading && (
            <div className="spinner-container">
              <Spinner color="info" className="spinner" type="grow" />
            </div>
          )}
        </Col>
      </Row>
      {details && (
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
                      <th scope="row">{camelToHuman(detail)}</th>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      {authorized || (
        <Alert color="danger">
          You are not authorized to see this content.
        </Alert>
      )}
    </Container>
  );
};

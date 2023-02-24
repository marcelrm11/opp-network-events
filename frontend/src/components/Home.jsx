import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { MyCard } from "./MyCard";

export const Home = ({ user }) => {
  // console.log("layout renders");
  const [events, setEvents] = useState([]);
  const url = "http://localhost:8000/events/" + "events/";
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
    }
    fetchData();
  }, [url]);
  return (
    <Container>
      <h1>Events {user.first_name}</h1>
      <Row xs="1" sm="2" md="4" className="gy-3">
        {events.map((e) => {
          return (
            <Col className="gap-1" key={`${e.title}${e.date}`}>
              <MyCard
                title={e.title}
                location={e.location}
                date={e.date}
                imgUrl={e.img_url}
                eventId={e.id}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

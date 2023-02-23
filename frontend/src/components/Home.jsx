import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { MyCard } from "./MyCard";

export const Home = () => {
  console.log("layout renders");
  const [events, setEvents] = useState([]);
  const url = "http://localhost:8000/events/" + "events/";
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setEvents(data);
    }
    fetchData();
  }, [url]);
  return (
    <Container>
      <Row xs="1" sm="2" md="4">
        {events.map((e) => {
          return (
            <Col className="bg-light border" key={`${e.title}${e.date}`}>
              <MyCard
                title={e.title}
                location={e.location}
                date={e.date}
                imgUrl={e.img_url}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

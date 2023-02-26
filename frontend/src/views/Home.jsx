import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { FilterModal } from "../components/FilterModal";
import { EventCard } from "../components/EventCard";

export const Home = ({ user, token }) => {
  // console.log("home renders");
  const [events, setEvents] = useState([]);
  const baseUrl = "http://localhost:8000/events/events/";
  const [url, setUrl] = useState(baseUrl);
  const [filterModal, setFilterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const url = "http://localhost:8000/events/" + "events/";
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      let headers = {};
      if (token) {
        headers = {
          Authorization: `Token ${token}`,
        };
      }
      const response = await fetch(url, {
        headers: headers,
      });
      const data = await response.json();
      setIsLoading(false);
      setEvents(data);
    }
    fetchData();
  }, [token, user, url]);

  const toggleFilters = () => {
    setFilterModal(!filterModal);
  };

  const handleFiltersChange = (filters) => {
    console.log("filters:", filters);
    let newUrl = baseUrl + "?";
    for (let [filter, value] of Object.entries(filters)) {
      console.log(filter, value ? true : false);
      if (value) {
        console.log(filter, "evaluated to truthy, and it's,", value);
        newUrl += `${filter}=${value}&`;
      }
    }
    console.log("new query:", newUrl);
    setUrl(newUrl);
    toggleFilters();
  };

  return (
    <>
      <Container>
        <Row xs="1" sm="2" className="mt-2">
          <Col>
            <h1>Events {user?.first_name || ""}</h1>
          </Col>
          <Col className="text-end">
            <Button color="info" outline onClick={toggleFilters}>
              Filters
            </Button>
          </Col>
        </Row>
        {isLoading ? (
          <div className="spinner-container">
            <Spinner color="info" className="spinner" type="grow" />
          </div>
        ) : (
          <Row xs="1" sm="2" md="3" lg="4" className="gy-3">
            {events.map((e) => {
              return (
                <Col className="gap-1" key={`${e.title}${e.date}`}>
                  <EventCard event={e} user={user} token={token} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
      <FilterModal
        isOpen={filterModal}
        toggle={toggleFilters}
        onFiltersChange={handleFiltersChange}
      />
    </>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import formatDate from "../functions/formatDate";
import "../styles/MyCard.css";
import { BsCalendar4Event, BsClock, BsGeoAlt } from "react-icons/bs";

export const MyCard = ({ title, date, location, imgUrl, eventId }) => {
  return (
    <Card className="my-card">
      <img alt="Sample" src={imgUrl} />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardText>
          <div>
            <span className="me-3">
              <BsCalendar4Event />
            </span>
            <span>{formatDate(date)[0]}</span>
          </div>
          <div>
            <span className="me-3">
              <BsClock />
            </span>
            <span>{formatDate(date)[1]}</span>
          </div>
          <div>
            <span className="me-3">
              <BsGeoAlt />
            </span>
            <span>{location}</span>
          </div>
        </CardText>
        <Button color="info">
          <Link to={`/event/${eventId}`}>Details</Link>
        </Button>
      </CardBody>
    </Card>
  );
};

import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

export const MyCard = ({ title, date, location, imgUrl }) => {
  return (
    <Card
      style={{
        width: "18rem",
      }}
    >
      <img alt="Sample" src={imgUrl} />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {date}
        </CardSubtitle>
        <CardText>{location}</CardText>
        <Button>Details</Button>
      </CardBody>
    </Card>
  );
};

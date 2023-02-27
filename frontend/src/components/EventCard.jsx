import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import formatDate from "../functions/formatDate";
import "../styles/MyCard.css";
import {
  BsCalendar4Event,
  BsClock,
  BsGeoAlt,
  BsDiamondHalf,
  BsPencil,
} from "react-icons/bs";
import { EventModal } from "./EventModal";

// card to populate the homepage with events
export const EventCard = ({ user, event, token }) => {
  const [eventModal, setEventModal] = useState(false);

  const toggleEventModal = () => {
    setEventModal(!eventModal);
  };

  const navigate = useNavigate();

  return (
    <>
      <Card className="my-card">
        <img
          alt="Sample"
          src={`https://picsum.photos/id/${event.id}/400/400`}
          onError={(e) =>
            (e.target.src =
              "https://picsum.photos/400/400?random=1&grayscale&blur=5")
          }
        />
        {(user?.is_superuser || event.creator === user?.id) && (
          <div>
            <Button className="me-3 edit-btn" onClick={toggleEventModal}>
              <BsPencil className="edit-icon" />
            </Button>
          </div>
        )}
        <CardBody>
          <CardTitle tag="h5">{event.title}</CardTitle>
          <div className="mb-3">
            <div>
              <span className="me-3">
                <BsCalendar4Event />
              </span>
              <span>{formatDate(event.date)[0]}</span>
            </div>
            <div>
              <span className="me-3">
                <BsClock />
              </span>
              <span>{formatDate(event.date)[1]}</span>
            </div>
            <div>
              <span className="me-3">
                <BsGeoAlt />
              </span>
              <span>{event.location}</span>
            </div>
            <div>
              <span className="me-3">
                <BsDiamondHalf />
              </span>
              <span>
                {event.status === "PB"
                  ? "Public"
                  : event.status === "DR"
                  ? "Draft"
                  : "Private"}
              </span>
            </div>
          </div>
          <Button color="info" onClick={() => navigate(`/event/${event.id}`)}>
            <span>Details</span>
          </Button>
        </CardBody>
      </Card>
      <EventModal
        isOpen={eventModal}
        toggle={toggleEventModal}
        event={event}
        token={token}
      />
    </>
  );
};

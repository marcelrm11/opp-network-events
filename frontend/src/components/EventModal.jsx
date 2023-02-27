import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

// modal to update an event
export const EventModal = ({ isOpen, toggle, event, token, onUpdate }) => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    location: "",
    img_url: "",
    status: "",
  });
  const navigate = useNavigate();

  const eventUrl = `http://127.0.0.1:8000/events/events/${event?.id}/`;

  useEffect(() => {
    setEventDetails({
      title: event.title,
      date: event.date,
      location: event.location,
      // img_url: event.img_url,
      status: event.status,
    });
  }, [event?.id]);

  const updateAction = async () => {
    try {
      const response = await fetch(eventUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(eventDetails),
      });
      console.log("passed event details:", eventDetails);
      // const data = await response.json();
      // console.log(data)
      if (!response.ok) {
        setIsInvalid(true);
      } else {
        onUpdate();
        toggle();
        navigate(`/event/${event.id}/`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Event</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Title</Label>
            <Input
              value={eventDetails.title}
              onChange={handleChange}
              name="title"
            />
            <Label>Location</Label>
            <Input
              value={eventDetails.location}
              onChange={handleChange}
              name="location"
            />
            <Label>Date</Label>
            <Input
              value={eventDetails.date}
              onChange={handleChange}
              name="date"
              type="datetime-local"
            />
            <Label>Status</Label>
            <Input
              value={eventDetails.status}
              onChange={handleChange}
              name="status"
              type="select"
            >
              <option value="DR">Draft</option>
              <option value="PV">Private</option>
              <option value="PB">Public</option>
            </Input>
            {/* <Label>Image</Label>
            <Input
              value={eventDetails.image}
              onChange={handleChange}
              name="img_url"
              type="url"
            /> */}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={updateAction}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

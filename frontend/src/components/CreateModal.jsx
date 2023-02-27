import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// Modal Form to create an Event
export const CreateModal = ({ isOpen, toggle, token, onNewEvent }) => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    location: "",
    status: "to-choose",
  });
  const navigate = useNavigate();

  const url = `http://127.0.0.1:8000/events/events/`;

  const createAction = async () => {
    // events endpoint with POST method and event details in request body
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(eventDetails),
      });
      // console.log("passed event details:", eventDetails);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        // console.log("not accepted");
      } else {
        onNewEvent();
        toggle();
        navigate(`/event/${data.id}/`);
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
              <option value="to-choose" disabled>
                Choose status
              </option>
              <option value="DR">Draft</option>
              <option value="PV">Private</option>
              <option value="PB">Public</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={createAction}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

export const FilterModal = ({ isOpen, toggle, onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search_query: "",
    after_date: "",
    before_date: "",
    location: "",
    status: "",
    past_events: false,
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    console.log(filters);
  };
  const handleCheckboxChange = () => {
    setFilters({ ...filters, past_events: !filters.past_events });
    console.log(filters);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Filter Events</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label className="me-2" check={filters.past_events}>
              Include past events
            </Label>
            <Input
              checked={filters.past_events}
              onChange={handleCheckboxChange}
              name="past_events"
              type="checkbox"
            />
            <br />
            <Label>Search title</Label>
            <Input
              value={filters.search_query}
              onChange={handleChange}
              name="search_query"
              type="search"
            />
            <Label>Search location</Label>
            <Input
              value={filters.location}
              onChange={handleChange}
              name="location"
              type="search"
            />
            <Label>After</Label>
            <Input
              value={filters.after_date}
              onChange={handleChange}
              name="after_date"
              type="date"
            />
            <Label>Before</Label>
            <Input
              value={filters.before_date}
              onChange={handleChange}
              name="before_date"
              type="date"
            />
            <Label>Status</Label>
            <Input
              value={filters.status}
              onChange={handleChange}
              name="status"
              type="select"
            >
              <option value="" disabled>
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
        <Button color="info" onClick={() => onFiltersChange(filters)}>
          Apply filters
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

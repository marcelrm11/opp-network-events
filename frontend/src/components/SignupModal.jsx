import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Alert,
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

import { camelToHuman } from "../functions/stringFunctions";

export const SignupModal = ({ isOpen, toggle, onSignupSuccess }) => {
  // modal form to create and register a user
  const [isInvalid, setIsInvalid] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  // this is used to populate the form
  const formFields = {
    username: {
      type: "text",
      value: "",
    },
    password: {
      type: "password",
      value: "",
    },
    email: {
      type: "email",
      value: "",
    },
    first_name: {
      type: "text",
      value: "",
    },
    last_name: {
      type: "text",
      value: "",
    },
  };
  const navigate = useNavigate();

  const baseUrl = "http://127.0.0.1:8000/events/";

  const signupAction = async () => {
    // api call to /users/register with POST method and error handling
    try {
      // console.log("data sent to register", credentials);
      const response = await fetch(baseUrl + `users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...credentials,
          events_created: [],
          events_subscribed: [],
        }),
      });
      const data = await response.json();
      // console.log("response from register endpoint", data);
      if (!response.ok) {
        setIsInvalid(true);
        const tempErrors = [];
        for (let [key, value] of Object.entries(data)) {
          tempErrors.push([`${key}: ${value}`]);
        }
        setValidationErrors(tempErrors);
      } else {
        setIsInvalid(false);
        onSignupSuccess();
        toggle();
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Signup</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            {Object.entries(formFields).map(([c, content]) => {
              return (
                <React.Fragment key={c}>
                  <Label>{camelToHuman(c)}</Label>
                  <Input
                    value={credentials[c]}
                    onChange={handleChange}
                    name={c}
                    type={content.type}
                  />
                </React.Fragment>
              );
            })}
          </FormGroup>
          {isInvalid && (
            <Alert color="danger">
              {validationErrors.map((e) => (
                <>
                  <span>{e}</span>
                  <br />
                </>
              ))}
            </Alert>
          )}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={signupAction}>
          Register
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

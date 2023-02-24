import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

export const LoginModal = ({
  isOpen,
  toggle,
  onLoginSuccess,
  onUserUpdate,
}) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const baseUrl = "http://127.0.0.1:8000/events/";

  const loginAction = async () => {
    try {
      const response = await fetch(baseUrl + `login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        setIsInvalid(true);
      } else {
        setIsInvalid(false);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        onUserUpdate(data.user);
        onLoginSuccess();
        toggle();
        navigate("/");
      }
    } catch (e) {
      setIsInvalid(true);
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Login</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Username</Label>
            <Input
              invalid={isInvalid}
              value={credentials.username}
              onChange={handleChange}
              name="username"
            />
            <Label>Password</Label>
            <Input
              invalid={isInvalid}
              type="password"
              value={credentials.password}
              onChange={handleChange}
              name="password"
            />
            <FormFeedback>Check credentials and try again</FormFeedback>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={loginAction}>
          Login
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

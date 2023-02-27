import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// modal to login in the app
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
    // api call with authentication and error handling
    try {
      const response = await fetch(baseUrl + `login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      // console.log("login response:", data);
      if (!response.ok) {
        setIsInvalid(true);
      } else {
        // store the information in the session storage. should be improved to secure sensitive data
        setIsInvalid(false);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("token", JSON.stringify(data.token));
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

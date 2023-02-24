import React, { useEffect, useState } from "react";
import {
  Alert,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { Navigate, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
import "../styles/Header.css";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";
import { fetchCurrentUser } from "../functions/authentication";

export const Header = ({ user, onUserUpdate, ...args }) => {
  const [activeSession, setActiveSession] = useState(false);
  console.log("header user from props:", user);

  const [loginSuccessAlert, setLoginSuccessAlert] = useState(false);
  const handleLoginSuccess = () => {
    setLoginSuccessAlert(true);
    setTimeout(() => {
      setLoginSuccessAlert(false);
    }, 3000);
    setActiveSession(true);
  };
  const [signupSuccessAlert, setSignupSuccessAlert] = useState(false);
  const handleSignupSuccess = () => {
    setSignupSuccessAlert(true);
    setTimeout(() => {
      setSignupSuccessAlert(false);
    }, 6000);
  };

  const [isOpenBar, setIsOpenBar] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const toggleBar = () => setIsOpenBar(!isOpenBar);
  const hideBar = () => setIsOpenBar(false);
  const toggleLogin = () => {
    setLoginModal(!loginModal);
    hideBar();
  };
  const toggleSignup = () => {
    setSignupModal(!signupModal);
    hideBar();
  };
  const [logoutSuccessAlert, setLogoutSuccessAlert] = useState(false);

  const toggleLogout = async () => {
    const response = await fetch("http://127.0.0.1:8000/events/logout/");
    const data = await response.json();
    console.log(data);
    hideBar();
    setActiveSession(false);
    sessionStorage.removeItem("user");
    onUserUpdate({});
    setLogoutSuccessAlert(true);
    setTimeout(() => {
      setLogoutSuccessAlert(false);
    }, 3000);
  };

  return (
    <div>
      <Navbar {...args}>
        <NavLink to="/" className="navbar-brand">
          <img src={logo} alt="logo" className="logo" />
          Network Events
        </NavLink>

        <NavbarToggler onClick={toggleBar} />
        <Collapse isOpen={isOpenBar} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink to="/" className="nav-link" onClick={toggleBar}>
                Events
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/users" className="nav-link" onClick={toggleBar}>
                My Profile
              </NavLink>
            </NavItem>
            {!activeSession ? (
              <>
                <NavItem>
                  <NavLink className="nav-link inactive" onClick={toggleLogin}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link inactive" onClick={toggleSignup}>
                    Signup
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLink className="nav-link inactive" onClick={toggleLogout}>
                  Logout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <LoginModal
        isOpen={loginModal}
        toggle={toggleLogin}
        onLoginSuccess={handleLoginSuccess}
        onUserUpdate={onUserUpdate}
      ></LoginModal>
      {loginSuccessAlert && <Alert color="success">Login successful!</Alert>}
      <SignupModal
        isOpen={signupModal}
        toggle={toggleSignup}
        onSignupSuccess={handleSignupSuccess}
      ></SignupModal>
      {signupSuccessAlert && (
        <Alert color="success">
          Registration successful! Verify your email and log in.
        </Alert>
      )}
      {logoutSuccessAlert && (
        <Alert color="secondary">Logout successful! Until next time.</Alert>
      )}
    </div>
  );
};

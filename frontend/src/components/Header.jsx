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
import { SiEventstore } from "react-icons/si";
import "../styles/Header.css";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";
import { fetchCurrentUser } from "../functions/authentication";
import { CreateModal } from "./CreateModal";

export const Header = ({ user, token, onUserUpdate, onNewEvent, ...args }) => {
  const [activeSession, setActiveSession] = useState(false);
  useEffect(() => {
    if (typeof user?.id == "number") {
      setActiveSession(true);
    } else {
      setActiveSession(false);
    }
  }, [user]);
  // console.log("header user from props:", user);

  // LOGIN MANAGEMENT ================
  const [loginSuccessAlert, setLoginSuccessAlert] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setLoginSuccessAlert(true);
    setTimeout(() => {
      setLoginSuccessAlert(false);
    }, 3000);
    setActiveSession(true);
  };
  const toggleLogin = () => {
    setLoginModal(!loginModal);
    hideBar();
  }; // ===============================

  // SIGNUP MANAGEMENT =================
  const [signupSuccessAlert, setSignupSuccessAlert] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const handleSignupSuccess = () => {
    setSignupSuccessAlert(true);
    setTimeout(() => {
      setSignupSuccessAlert(false);
    }, 6000);
  };
  const toggleSignup = () => {
    setSignupModal(!signupModal);
    hideBar();
  }; // ================================

  // LOGOUT MANAGEMENT =================
  const [logoutSuccessAlert, setLogoutSuccessAlert] = useState(false);

  const toggleLogout = async () => {
    const response = await fetch("http://127.0.0.1:8000/events/logout/");
    const data = await response.json();
    console.log(data);
    hideBar();
    setActiveSession(false);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    onUserUpdate({});
    setLogoutSuccessAlert(true);
    setTimeout(() => {
      setLogoutSuccessAlert(false);
    }, 3000);
  }; // ==================================

  // CREATE EVENT ====================
  const [eventModal, setEventModal] = useState(false);
  const toggleEvent = () => {
    setEventModal(!eventModal);
    hideBar();
  }; // ==================================

  // NAVBAR MANAGEMENT ====================
  const [isOpenBar, setIsOpenBar] = useState(false);
  const toggleBar = () => setIsOpenBar(!isOpenBar);
  const hideBar = () => setIsOpenBar(false);
  // ======================================

  return (
    <div>
      <Navbar {...args}>
        <NavLink to="/" className="navbar-brand">
          <SiEventstore alt="logo" className="logo me-3" />
          Network Events{user?.is_superuser && "  - Super User"}
        </NavLink>

        <NavbarToggler onClick={toggleBar} />
        <Collapse isOpen={isOpenBar} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink to="/" className="nav-link" onClick={toggleBar}>
                Events
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
              <>
                <NavItem>
                  <NavLink className="nav-link inactive" onClick={toggleEvent}>
                    Create Event
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to={`/user/${user.id}`}
                    className="nav-link"
                    onClick={toggleBar}
                  >
                    My Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link inactive" onClick={toggleLogout}>
                    Logout
                  </NavLink>
                </NavItem>
              </>
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
      <CreateModal
        isOpen={eventModal}
        toggle={toggleEvent}
        token={token}
        onNewEvent={onNewEvent}
      />
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

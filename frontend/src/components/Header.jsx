import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
import "../styles/Header.css";
import { LoginModal } from "./LoginModal";

export const Header = (props) => {
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

  return (
    <div>
      <Navbar {...props}>
        <NavbarBrand href="/">
          <img src={logo} alt="logo" className="logo" />
          Network Events
        </NavbarBrand>
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
            <NavItem>
              <NavLink className="nav-link" onClick={toggleLogin}>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" onClick={toggleSignup}>
                Signup
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <LoginModal isOpen={loginModal} toggle={toggleLogin}></LoginModal>
      {/* <MyModal isOpen={signupModal} toggle={toggleSignup}></MyModal> */}
    </div>
  );
};

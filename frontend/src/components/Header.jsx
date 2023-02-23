import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import logo from "../logo.svg";
import "../styles/Header.css";

export const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...props}>
        <NavbarBrand href="/">
          <img src={logo} alt="logo" className="logo" />
          Network Events
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="#">Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">UserName</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { NavUser } from "./NavUser";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar dark className="text-nowrap navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3">
      <NavbarBrand tag={Link} to="/"><FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" /> Troll IT</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar className="text-end">
        <Nav navbar className="me-auto">
          <NavItem>
            <NavLink tag={Link} to="/dashboard">Tableau de bord</NavLink>
          </NavItem>
        </Nav>
        <NavUser />
      </Collapse>
    </Navbar>
  )
}
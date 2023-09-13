import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import InputAddon from "./InputAddon";

import { auth } from "../features/selectors";
import { resetAuth, logoutUser } from "../features/auth/authSlice";
import { routes } from "../constants";

function Sidebar({ logo }) {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { authData } = useSelector(auth);
  const user = JSON.parse(localStorage.getItem("user"))

  const path = window.location.pathname;

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleRoute = (link) => {
    navigate(link);
    setCollapseOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    // dispatch(resetAuth())
    navigate("/");
  };

  let navbarBrandProps;

  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              end
            >
              <DropdownItem>Action</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="..." src={""} />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" end>
              <DropdownItem href="#" onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputAddon icon="fa fa-search" />
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            {authData &&
              routes[authData.role].map((route, index) => (
                <div key={index}>
                  {route.link !== "#" && (
                    <NavItem>
                      <NavLink
                        onClick={() => handleRoute(route.link)}
                        style={{ cursor: "pointer" }}
                        className={path === route.link ? "active" : ""}
                      >
                        <i className={route.icon} />
                        {route.text}
                      </NavLink>
                    </NavItem>
                  )}
                  {route.link === "#" && (
                    <NavItem>
                      <hr className="my-3" />
                      <h6 className="navbar-heading text-muted ml-4">
                        {route.text}
                      </h6>
                    </NavItem>
                  )}
                </div>
              ))}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

Sidebar.propTypes = {
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;

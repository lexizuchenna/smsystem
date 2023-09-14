import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Col,
  Row,
} from "reactstrap";

import InputAddon from "./InputAddon";

import { auth } from "../features/selectors";
import { logoutUser } from "../features/auth/authSlice";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authData } = useSelector(auth);

  const { isExpired } = useJwt(authData?.token || "");

  const handleLogout = () => {
    dispatch(logoutUser());
    return navigate("/");
  };

  useEffect(() => {
    if (isExpired) {
      return handleLogout();
    }
  }, []);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Link
          className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          to="/"
        >
          SMSystem
        </Link>
        <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
          <FormGroup className="mb-0">
            <InputGroup className="input-group-alternative">
              <InputAddon icon="fas fa-search" />
              <Input placeholder="Search" type="text" />
            </InputGroup>
          </FormGroup>
        </Form>
        <Nav className="align-items-center d-none d-md-flex" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt={authData?.role}
                    src={authData?.image}
                    height="40px"
                    width="40px"
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                    {authData?.name}
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" end>
              {authData?.role === "admin" && (
                <>
                  <DropdownItem>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem divider />
                </>
              )}
              <DropdownItem onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
      <div
        className="header d-flex align-items-center pt-7"
        style={{
          minHeight: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" md="12">
              <h1 className="display-2 text-white">Hello {authData?.name}</h1>
              <p className="text-white mt-0">
                Welcome to school management portal...
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminNavbar;

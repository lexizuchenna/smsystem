import React from "react";
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

function AuthFooter() {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}
                <a
                  className="font-weight-bold ml-1"
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lexiz Tech
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lexiz Tech
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MIT License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default AuthFooter;

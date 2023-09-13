import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

const BASE_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

import { admin, auth } from "../../features/selectors";
import { termOptions, sessionOptions } from "../../constants";

function Terms({ setIsLoading }) {
  const location = useLocation();

  const { session } = location.state;

  const navigate = useNavigate();

  const handleNext = (term) => {
    console.log(session);
    return;
    return navigate(`/admin/session/${term}`);
  };

  return (
    <Container className="pb-5 mt-3">
      <Row className="justify-content-center">
        <Col lg="12" md="12" sm="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2">
                <h4>Select Term</h4>
              </div>
            </CardHeader>
            <CardBody>
              <Row className="align-items-center justify-content-center">
                {termOptions.map((term) =>
                  term.value === "default" ? (
                    ""
                  ) : (
                    <Col key={term} sm="4">
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={() => handleNext(term)}
                        >
                          {term}
                        </Button>
                      </div>
                    </Col>
                  )
                )}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Terms;

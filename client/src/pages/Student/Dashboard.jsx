import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import { auth } from "../../features/selectors";

function Dashboard() {
  const [formData, setFormData] = useState({});

  const { authData } = useSelector(auth);
  // const { studentMessage, isStudentError, isStudentSuccess } =
    // useSelector(student);

  useEffect(() => {
    setFormData(authData);
  }, []);

  // useEffect(() => {
  //   if (isStudentSuccess) {
  //     enqueueSnackbar(studentMessage, { variant: "success" });

  //     dispatch(resetStudent());
  //   }

  //   if (isStudentError) {
  //     dispatch(resetStudent());

  //     if (studentMessage === "Jwt Expired") {
  //       dispatch(logoutUser());
  //       dispatch(resetAuth());
  //       enqueueSnackbar("Session Expired", { variant: "error" });
  //       return navigate("/");
  //     }

  //     enqueueSnackbar(studentMessage, { variant: "error" });
  //   }
  // }, [studentMessage]);

  return (
    <Container className="" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="bg-secondary shadow mt-5">
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="4">
                <div
                  className="card-profile-image"
                  style={{ width: "150px", margin: "0 auto 20px auto" }}
                >
                  <img
                    alt={formData.username}
                    className="rounded-circle"
                    src={formData.image}
                    width="150px"
                    height="150px"
                  />
                </div>
              </Col>
            </Row>
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col className="text-left text-md" xs="6">
                  <Button color="dark" onClick={() => {}} size="md" disabled>
                    Student
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  Student Information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Full Name
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={formData.name}
                          name="name"
                          placeholder="Full Name"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Username
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={formData.username}
                          type="text"
                          disabled
                          name="username"
                          placeholder="Username"
                        />
                      </FormGroup>
                    </Col>
                    {formData.subjects &&
                      formData.subjects.map((subject, index) => (
                        <Col key={index} sm="4">
                          <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              checked={true}
                              disabled
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={subject}
                            >
                              {subject.toUpperCase()}
                            </label>
                          </div>
                        </Col>
                      ))}
                  </Row>
                </div>
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">
                  other information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="text-sm">Date of Birth</label>
                        <Input
                          className="form-control-alternative"
                          name="dob"
                          type="date"
                          disabled
                          value={
                            formData?.dob &&
                            new Date(formData?.dob).toISOString().slice(0, 10)
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;

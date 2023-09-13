import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
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

const BASE_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

import {
  resetAdmin,
  createSession,
  updateSession,
  deleteSession,
} from "../../features/admin/adminSlice";
import { admin, auth } from "../../features/selectors";
import { termOptions, sessionOptions } from "../../constants";

import InputBox from "../../components/Input";
import DeleteModal from "../../components/Modals/Delete";

function Session({ setIsLoading }) {
  const [data, setData] = useState({});
  const [records, setRecords] = useState({
    session: "default",
    term: "default",
    "resumption-date": "",
    newsletter: "",
  });
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { isAdminSuccess, adminMessage, isAdminError } = useSelector(admin);
  const { authData } = useSelector(auth);

  const config = {
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${BASE_URL}/api/get-record/`, config)
      .then((response) => {
        const { data } = response;
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        const message = error?.response?.data || error.message;
        enqueueSnackbar(message, { variant: "error" });
        if (message === "Jwt Expired") {
          dispatch(logoutUser());
          return navigate("/");
        }
      });
  }, []);

  useEffect(() => {
    if (isAdminSuccess) {
      enqueueSnackbar(adminMessage, { variant: "success" });
      setIsOpen(false)
      dispatch(resetAdmin());
    }

    if (isAdminError) {
      enqueueSnackbar(adminMessage, { variant: "error" });
      setIsOpen(false)

      if (adminMessage === "Jwt Expired") {
        dispatch(logoutUser());
        return navigate("/");
      }

      dispatch(resetAdmin());
    }
  }, [adminMessage]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (e.target.name === "resumption-date") {
      return setRecords((prev) => ({
        ...prev,
        "resumption-date": new Date(value).toISOString().slice(0, 10),
      }));
    }
    setRecords((prev) => ({ ...prev, [name]: value }));
  };

  const handleDataChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (e.target.name === "resumption-date") {
      return setData((prev) => ({
        ...prev,
        "resumption-date": new Date(value).toISOString().slice(0, 10),
      }));
    }
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSession = (e) => {
    e.preventDefault();

    if (records.session === "default") {
      return enqueueSnackbar("Select Session", { variant: "error" });
    }

    if (records.term === "default") {
      return enqueueSnackbar("Select Term", { variant: "error" });
    }

    if (records["resumption-date"] === "") {
      return enqueueSnackbar("Enter Date", { variant: "error" });
    }

    if (records.newsletter === "") {
      return enqueueSnackbar("No Newsletter", { variant: "error" });
    }

    dispatch(createSession(records));
  };

  const handleUpdateSession = (e) => {
    e.preventDefault();

    if (!data.newsletter) {
      return enqueueSnackbar("No Newsletter", { variant: "error" });
    }

    if (!data["resumption-date"]) {
      return enqueueSnackbar("Enter Date", { variant: "error" });
    }
    dispatch(updateSession(data));
  };

  const handleDeleteRecord = (e) => {
    e.preventDefault();
    dispatch(deleteSession({ id: data._id }));
  };

  const DeleteBtn = () => {
    return (
      <Button color="danger" type="button" onClick={handleDeleteRecord}>
        Delete
      </Button>
    );
  };

  return (
    <Container className="" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col className="text-left text-md" xs="4">
                  <Button
                    color="primary"
                    onClick={() => setEdit(!edit)}
                    size="md"
                  >
                    {edit ? "Cancel" : "Edit"}
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  Current Session Details
                </h6>
                <div className="pl-lg-4">
                  {data ? (
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Session
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.session}
                            placeholder="Session"
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
                            Term
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.term}
                            type="text"
                            disabled
                            placeholder="Term"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Date of Resumption
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="resumption-date"
                            type="date"
                            value={
                              data["resumption-date"] &&
                              new Date(data["resumption-date"])
                                .toISOString()
                                .slice(0, 10)
                            }
                            disabled={!edit}
                            onChange={handleDataChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label">
                            News Letter
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="newsletter"
                            type="textarea"
                            value={data.newsletter}
                            disabled={!edit}
                            onChange={handleDataChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <Row>
                          <Col sm="6">
                            <div className="text-center">
                              <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                disabled={!edit}
                                onClick={handleUpdateSession}
                              >
                                Update Record
                              </Button>
                            </div>
                          </Col>
                          <Col sm="6">
                            <div className="text-center">
                              <Button
                                className="my-4"
                                color="danger"
                                type="button"
                                disabled={edit}
                                onClick={toggleModal}
                              >
                                Delete Record
                              </Button>
                              <DeleteModal
                                isOpen={isOpen}
                                toggle={toggleModal}
                                DeleteBtn={DeleteBtn}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">No Data</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="No Session/Term"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                  Create New Session
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="12">
                      <InputBox
                        type="select"
                        options={sessionOptions}
                        name="session"
                        onChange={handleInputChange}
                        value={records["session"]}
                      />
                    </Col>
                    <Col md="12">
                      <InputBox
                        type="select"
                        options={termOptions}
                        name="term"
                        onChange={handleInputChange}
                        value={records["term"]}
                      />
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Input
                          className="form-control-alternative"
                          name="resumption-date"
                          type="date"
                          value={records["resumption-date"]}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="12">
                      <FormGroup>
                        <Input
                          className="form-control-alternative"
                          name="newsletter"
                          type="textarea"
                          value={records.newsletter}
                          onChange={handleInputChange}
                          placeholder="NewsLetter"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={handleCreateSession}
                        >
                          Create Records
                        </Button>
                      </div>
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

export default Session;

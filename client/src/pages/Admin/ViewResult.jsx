import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
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
  approveResult,
  rejectResult,
} from "../../features/admin/adminSlice";
import { logoutUser } from "../../features/auth/authSlice";
import { admin, auth } from "../../features/selectors";

import InputBox from "../../components/Input";
import RejectModal from "../../components/Modals/Reject";
import ScriptModal from "../../components/Modals/Script";

function ViewResult({ setIsLoading }) {
  const { authData } = useSelector(auth);
  const [result, setResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const { term, username, session } = useParams();

  const { isAdminSuccess, adminMessage, isAdminError } = useSelector(admin);

  const config = {
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/api/get-result/${username}/${session}/${term}`,
          config
        );

        setResult(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const message = error?.response?.data || error.message;
        enqueueSnackbar(message, { variant: "error" });
      }
    })();
  }, []);

  useEffect(() => {
    if (isAdminSuccess) {
      enqueueSnackbar(adminMessage, { variant: "success" });
      dispatch(resetAdmin());
      setTimeout(() => {
        window.history.back();
      }, 2000);
    }

    if (isAdminError) {
      enqueueSnackbar(adminMessage, { variant: "error" });

      if (adminMessage === "Jwt Expired") {
        dispatch(logoutUser());
        return navigate("/");
      }

      dispatch(resetAdmin());
    }
  }, [adminMessage]);

  const handleApprove = async (e) => {
    e.preventDefault();

    try {
      const approved = { ...result, a_approve: true };

      const formData = { username, term, session, result: approved };

      dispatch(approveResult(formData));
    } catch (error) {
      setIsLoading(false);
      const message = error?.response?.data || error.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const RejectBtn = (props) => {
    const handleClick = () => {
      if (!props.message) {
        return enqueueSnackbar("Type Message", { variant: "error" });
      }

      const reject = {
        ...props,
        a_reject: true,
        a_approve: false,
        f_approve: false,
        f_message: props.message,
      };

      const formData = { username, term, session, result: reject };

      console.log(formData);

      dispatch(rejectResult(formData));
    };
    return (
      <Button color="danger" type="button" onClick={handleClick}>
        Reject With Message
      </Button>
    );
  };

  const handleResult = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/result?username=${username}&session=${session}&term=${term}`,
        config
      );
      setIsLoading(false);

      const newTab = window.open();
      newTab.document.open();
      newTab.document.write(data);
      newTab.document.close();
    } catch (error) {
      setIsLoading(false);
      const message = error?.response?.data || error.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const SubjectRow = ({ subject }) => {
    const [isScriptOpen, setIsScriptOpen] = useState(false);

    const toggleScript = () => {
      setIsScriptOpen(!isScriptOpen);
    };

    return (
      <>
        <Col sm="12" lg="12" md="12">
          <h6 className="heading-small text-muted mb-4">{subject.title}</h6>
          <Row>
            <Col sm="4">
              <InputBox type="number" value={subject["class-work"]} disabled />
            </Col>
            <Col sm="4">
              <InputBox type="number" value={subject["assignment"]} disabled />
            </Col>
            <Col sm="4">
              <InputBox
                type="number"
                value={subject["mid-term-test"]}
                disabled
              />
            </Col>
            <Col sm="4">
              <InputBox type="number" value={subject["project"]} disabled />
            </Col>
            <Col sm="4">
              <InputBox type="number" value={subject["exam"]} disabled />
            </Col>
            <Col sm="4">
              <div className="">
                <Button
                  className=""
                  color="info"
                  type="button"
                  onClick={toggleScript}
                >
                  Script
                </Button>
              </div>
            </Col>
            <Col sm="12">
              <ScriptModal
                isOpen={isScriptOpen}
                toggle={toggleScript}
                image={subject.image}
              />
            </Col>
          </Row>
        </Col>
        <hr className="my-4" style={{ width: "95%" }} />
      </>
    );
  };

  return (
    <Container className="" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col className="text-left text-md" xs="6">
                  <Button
                    color="dark"
                    onClick={() => window.history.back()}
                    size="md"
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  Result Details
                </h6>
                <hr className="my-4" />
                <div className="pl-lg-4">
                  <Row>
                    {result &&
                      result?.subjects?.map((s, index) => (
                        <SubjectRow key={index} subject={s} />
                      ))}
                    {!result.a_approve && (
                      <Col sm="6">
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="danger"
                            type="button"
                            onClick={toggleModal}
                          >
                            Reject
                          </Button>
                          <RejectModal
                            isOpen={isOpen}
                            toggle={toggleModal}
                            RejectBtn={RejectBtn}
                            RejectBtnProps={result}
                          />
                        </div>
                      </Col>
                    )}

                    <Col sm="6">
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="success"
                          type="button"
                          onClick={handleApprove}
                          disabled={result.a_approve}
                        >
                          {result.a_approve ? "Approved" : "Approve"}
                        </Button>
                      </div>
                    </Col>
                    {result.a_approve && (
                      <Col sm="6">
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="info"
                            type="button"
                            onClick={handleResult}
                          >
                            View Result
                          </Button>
                        </div>
                      </Col>
                    )}
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

export default ViewResult;

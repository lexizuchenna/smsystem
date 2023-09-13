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
  resetFTeacher,
  approveResult,
  rejectResult,
} from "../../features/formTeacher/fTeacherSlice";
import { fTeacher, auth } from "../../features/selectors";
import { checkSubjects } from "../../utils";

import InputBox from "../../components/Input";
import RejectModal from "../../components/Modals/Reject";
import ScriptModal from "../../components/Modals/Script";

function ViewResult({ setIsLoading }) {
  const { authData } = useSelector(auth);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();
  const { term, username, session } = useParams();

  const { isFTeacherSuccess, fTeacherMessage, isFTeacherError } =
    useSelector(fTeacher);

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
        const result = await axios.get(
          `${BASE_URL}/api/get-result/${username}/${session}/${term}`,
          config
        );

        setResult(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const message = error?.response?.data || error.message;
        enqueueSnackbar(message, { variant: "error" });
      }
    })();
  }, []);

  useEffect(() => {
    if (isFTeacherSuccess) {
      enqueueSnackbar(fTeacherMessage, { variant: "success" });

      dispatch(resetFTeacher());
    }

    if (isFTeacherError) {
      enqueueSnackbar(fTeacherMessage, { variant: "error" });

      dispatch(resetFTeacher());
    }
  }, [fTeacherMessage]);

  const handleApprove = async (e) => {
    e.preventDefault();

    try {
      const approved = { ...result, f_approve: true, a_reject: false, f_message: "",  };
      setIsLoading(true);
      const { data: student } = await axios.get(
        `${BASE_URL}/api/get-student/${username}`,
        config
      );
      setIsLoading(false);

      const subjects = approved.subjects.map((subject) => subject.title);

      if (!checkSubjects(subjects, student.subjects)) {
        return enqueueSnackbar("Student Have Incomplete Result", {
          variant: "error",
        });
      }
      const formData = { username, term, session, result: approved };
      dispatch(approveResult(formData));
      setResult(approved);
    } catch (error) {
      setIsLoading(false);
      const message = error?.response?.data || error.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const handleViewResult = async (e) => {
    e.preventDefault();
  };

  const RejectBtn = (props) => {
    const handleClick = () => {
      if (!props.message) {
        return enqueueSnackbar("Type Message", { variant: "error" });
      }

      const reject = { ...props, reject: true, approved: false };

      const index = result.subjects.findIndex((x) => x.title === reject.title);

      result.subjects[index] = reject;

      const formData = { username, term, session, result };

      dispatch(rejectResult(formData));
    };
    return (
      <Button color="danger" type="button" onClick={handleClick}>
        Reject With Message
      </Button>
    );
  };

  const SubjectRow = ({ subject }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScriptOpen, setIsScriptOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

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
              <div className=" text-center">
                <Button
                  className=""
                  color="danger"
                  type="button"
                  onClick={toggleModal}
                  disabled={result.f_approve}
                >
                  Reject
                </Button>
              </div>
              <RejectModal
                isOpen={isOpen}
                toggle={toggleModal}
                RejectBtn={RejectBtn}
                RejectBtnProps={subject}
              />
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
              {result.a_approve && (
                <div className="text-center">
                  <h2 className="text-success">Result Approved</h2>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="dark"
                      type="button"
                      onClick={handleViewResult}
                    >
                      View Result
                    </Button>
                  </div>
                </div>
              )}
              <Form className={`${result.a_approve ? "d-none" : ""}`}>
                <h6 className="heading-small text-muted mb-4">
                  Result Details
                </h6>
                <hr className="my-4" />
                <div className="pl-lg-4">
                  <Row>
                    {result.a_reject && (
                      <Col md="12">
                        <InputBox
                          type="textarea"
                          label="Message"
                          value={result.f_message}
                          addonIcon="fa-solid fa-envelope"
                          addonStyle={{ color: "red" }}
                        />
                      </Col>
                    )}
                    {result &&
                      result?.subjects?.map((s, index) => (
                        <SubjectRow key={index} subject={s} />
                      ))}
                    <Col sm="12">
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="success"
                          type="button"
                          onClick={handleApprove}
                          disabled={result.f_approve}
                        >
                          {result.f_approve
                            ? "Awaiting Approval..."
                            : "Approve"}
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

export default ViewResult;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Compress from "compress.js";
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
  resetSTeacher,
  saveResult,
} from "../../features/subTeacher/sTeacherSlice";
import { logoutUser } from "../../features/auth/authSlice";
import { sTeacher, auth, fTeacher } from "../../features/selectors";

import InputBox from "../../components/Input";

const scheme = [
  { key: "class-work", text: "Class Work" },
  { key: "assignment", text: "Assignment" },
  { key: "mid-term-test", text: "Mid Term Test" },
  { key: "project", text: "Project" },
  { key: "exam", text: "Exam" },
];

function CreateResult({ setIsLoading }) {
  const { authData } = useSelector(auth);
  const compress = new Compress();

  const [data, setData] = useState({});
  const [result, setResult] = useState({
    title: authData?.subject,
    assignment: 0,
    project: 0,
    exam: 0,
    "class-work": 0,
    "mid-term-test": 0,
    image: "",
    approved: false,
    message: "",
    reject: false,
  });
  const [mainRes, setMainRes] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();

  const { isSTeacherSuccess, sTeacherMessage, isSTeacherError } =
    useSelector(sTeacher);

  const config = {
    headers: {
      Authorization: `Bearer ${authData?.token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/get-record`, config);
        const result = await axios.get(
          `${BASE_URL}/api/get-result/${username}/${data.session}/${data.term}`,
          config
        );

        setMainRes(result.data);

        const records = result.data.subjects.find(
          (subject) => subject.title === authData.subject
        );

        if (records) {
          setResult(records);
        }

        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const message = error?.response?.data || error.message;

        if (message === "Jwt Expired") {
          dispatch(logoutUser());
          return navigate("/");
        }

        enqueueSnackbar(message, { variant: "error" });
      }
    })();
  }, []);

  useEffect(() => {
    if (isSTeacherSuccess) {
      enqueueSnackbar(sTeacherMessage, { variant: "success" });
      if (sTeacherMessage === "Sent for approval") {
        setResult({ ...result, approved: true });
      }

      dispatch(resetSTeacher());
    }

    if (isSTeacherError) {
      enqueueSnackbar(sTeacherMessage, { variant: "error" });

      dispatch(resetSTeacher());
    }
  }, [sTeacherMessage]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setResult((prev) => ({
      ...prev,
      [e.target.name]: value !== "" ? parseInt(value) : "",
    }));
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];

    const options = {
      size: 1,
      quality: 1,
      maxWidth: 600,
      maxHeight: 700,
    };

    setIsLoading(true);
    const data = await compress.compress([file], options);
    setIsLoading(false);

    const image = data[0].prefix + data[0].data;
    setResult({ ...result, image });
  };

  const handleCreateResult = (e) => {
    e.preventDefault();

    dispatch(
      saveResult({
        username,
        data: result,
        term: data.term,
        session: data.session,
      })
    );
  };

  const handleApprove = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const check = await axios.get(
        `${BASE_URL}/api/get-result/${username}/${data.session}/${data.term}`,
        config
      );
      setIsLoading(false);

      const checkResult = check.data.subjects.find(
        (sub) => sub.title === authData.subject
      );

      if (!checkResult) {
        return enqueueSnackbar("Save Result and Try Again", {
          variant: "error",
        });
      }

      if (!checkResult.assignment) {
        return enqueueSnackbar("Save Assignment and Try Again", {
          variant: "error",
        });
      }
      if (!checkResult["class-work"]) {
        return enqueueSnackbar("Save Class Work and Try Again", {
          variant: "error",
        });
      }
      if (!checkResult["mid-term-test"]) {
        return enqueueSnackbar("Save Mid Term Test and Try Again", {
          variant: "error",
        });
      }
      if (!checkResult.project) {
        return enqueueSnackbar("Save Project and Try Again", {
          variant: "error",
        });
      }
      if (!checkResult.exam) {
        return enqueueSnackbar("Save Exam and Try Again", { variant: "error" });
      }
      if (!checkResult.image) {
        return enqueueSnackbar("Save Uploaded Script and Try Again", {
          variant: "error",
        });
      }

      const approvedResult = { ...checkResult, approved: true, reject: false };

      dispatch(
        saveResult({
          username,
          data: approvedResult,
          term: data.term,
          session: data.session,
        })
      );
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error.message, { variant: "error" });
    }
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
                {/* <Col className="text-right text-md" xs="6">
                  <Button
                    color="primary"
                    onClick={() => setEdit(!edit)}
                    size="md"
                  >
                    {edit ? "Cancel" : "Edit"}
                  </Button>
                </Col> */}
              </Row>
            </CardHeader>
            <CardBody>
              {mainRes.f_approve && (
                <div className="text-center">
                  <h2 className="text-success">Result Approved</h2>
                </div>
              )}
              <Form className={`${mainRes.f_approve ? "d-none" : ""}`}>
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
                          />
                        </FormGroup>
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
                  Add Result Data
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    {result.reject && (
                      <Col md="12">
                        <InputBox
                          type="text"
                          label="Message"
                          defaultValue={result.message}
                          // disabled
                          valid="invalid"
                          addonIcon="fa-solid fa-envelope"
                          addonStyle={{ color: "red" }}
                        />
                      </Col>
                    )}
                    {scheme.map((s, index) => (
                      <Col md="12" key={index}>
                        <InputBox
                          type="number"
                          name={s.key}
                          onChange={handleInputChange}
                          placeholder={s.text}
                          label={s.text}
                          value={result[s.key]}
                          disabled={result.approved}
                        />
                      </Col>
                    ))}
                    <Col sm="12">
                      <InputBox
                        label="Attach Script"
                        name="photo"
                        onChange={handleFile}
                        type="file"
                        defaultValue={result.image}
                        accept=".jpg, .jpeg, .png"
                        disabled={result.approved}
                      />
                    </Col>
                    {result.image && (
                      <Col className="" sm="12">
                        <div
                          className=""
                          style={{ width: "150px", margin: "0 auto 20px auto" }}
                        >
                          <img
                            className=""
                            src={result.image}
                            width="150px"
                            height="150px"
                          />
                        </div>
                      </Col>
                    )}

                    <Col sm="6">
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={handleCreateResult}
                          disabled={result.approved}
                        >
                          Save
                        </Button>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="success"
                          type="button"
                          onClick={handleApprove}
                          disabled={result.approved}
                        >
                          Approve
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

export default CreateResult;

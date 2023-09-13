import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Compress from "compress.js";
import axios from "axios";
import moment from "moment";
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

import { auth, fTeacher } from "../../features/selectors";
import { juniors, seniors } from "../../constants";
import {
  resetFTeacher,
  updateStudent,
} from "../../features/formTeacher/fTeacherSlice";
import { resetAuth, logoutUser } from "../../features/auth/authSlice";

import InputBox from "../../components/Input";

const BASE_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

let allSubjects;

function ViewStudent({ setIsLoading }) {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);

  const compress = new Compress();

  const dispatch = useDispatch();
  const { authData } = useSelector(auth);
  const { fTeacherMessage, isFTeacherError, isFTeacherSuccess } =
    useSelector(fTeacher);

  const { username } = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  };

  const level = authData.grade.substring(0, 2);
  allSubjects = level === "ss" ? seniors : juniors;

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${BASE_URL}/api/get-student/${username}`, config)
      .then((response) => {
        const { data } = response;
        setFormData({ ...data, password: "" });
        setIsLoading(false);

        const updatesSubjects = allSubjects.map((subject) => ({
          ...subject,
          checked: data.subjects.includes(subject.name),
        }));

        setSubjects(updatesSubjects);
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar(error.message, { variant: "error" });
      });
  }, []);

  useEffect(() => {
    if (isFTeacherSuccess) {
      enqueueSnackbar(fTeacherMessage, { variant: "success" });
      setEdit(false)

      dispatch(resetFTeacher());
    }

    if (isFTeacherError) {
      dispatch(resetFTeacher());

      if (fTeacherMessage === "Jwt Expired") {
        dispatch(logoutUser());
        dispatch(resetAuth());
        enqueueSnackbar("Session Expired", { variant: "error" });
        return navigate("/");
      }

      enqueueSnackbar(fTeacherMessage, { variant: "error" });
    }
  }, [fTeacherMessage]);

  const handleFile = async (e) => {
    const file = e.target.files[0];

    const options = {
      size: 1,
      quality: 1,
      maxWidth: 600,
      maxHeight: 600,
    };

    setIsLoading(true);
    const data = await compress.compress([file], options);
    setIsLoading(false);

    const image = data[0].prefix + data[0].data;
    setFormData({ ...formData, image });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "dob") {
      return setFormData((prev) => ({
        ...prev,
        dob: new Date(value).toISOString().slice(0, 10),
      }));
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleAddSubject = (e, index) => {
    setSubjects(
      subjects.map((subject, currentIndex) =>
        currentIndex === index
          ? { ...subject, checked: !subject.checked }
          : subject
      )
    );

    const findOne = formData.subjects.find(
      (subject) => subject === e.target.name
    );

    if (findOne) {
      const newSubjects = formData.subjects.filter(
        (subject) => subject !== e.target.name
      );
      formData.subjects = newSubjects;
    } else {
      formData.subjects.push(e.target.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      return enqueueSnackbar("Invalid Name", { variant: "error" });
    }

    if (formData.subjects.length < 5) {
      return enqueueSnackbar("Check Subjects", { variant: "error" });
    }
    dispatch(updateStudent(formData));
  };

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
                  <Button
                    color="dark"
                    onClick={() => window.history.back()}
                    size="md"
                  >
                    Back
                  </Button>
                </Col>
                <Col className="text-right text-md" xs="6">
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
              <Form onSubmit={handleSubmit}>
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
                          disabled={!edit}
                          onChange={handleInputChange}
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
                    {subjects.map((subject, index) => (
                      <Col key={index} sm="4">
                        <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            name={subject.name}
                            id={subject.name}
                            checked={subject.checked}
                            onChange={(e) => handleAddSubject(e, index)}
                            disabled={!edit}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={subject.name}
                          >
                            {subject.text}
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
                    {/* <Col md="12">
                      <FormGroup>
                        <label className="form-control-label">Address</label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          name="address"
                          placeholder="Home Address"
                          type="text"
                          disabled={!edit}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col> */}
                    <Col lg="6">
                      <FormGroup>
                        <label className="text-sm">Date of Birth</label>
                        <Input
                          className="form-control-alternative"
                          name="dob"
                          type="date"
                          disabled={!edit}
                          onChange={handleInputChange}
                          value={formData?.dob && new Date(formData?.dob)
                            .toISOString()
                          .slice(0, 10)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <InputBox
                        label="Select Passport"
                        name="photo"
                        onChange={handleFile}
                        type="file"
                        value={formData.image}
                        accept=".jpg, .jpeg, .png"
                        disabled={!edit}
                      />
                    </Col>
                    {/* <Col lg="4">
                      <FormGroup>
                        <label className="form-control-label">Sex</label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="Male"
                          placeholder="Sex"
                          type="text"
                          disabled={!edit}
                        />
                      </FormGroup>
                    </Col> */}
                  </Row>
                </div>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    disabled={!edit}
                  >
                    Update Student
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewStudent;

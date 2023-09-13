import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Compress from "compress.js";
import {
  Col,
  Form,
  Row,
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormGroup,
  Input,
} from "reactstrap";

import InputBox from "../../components/Input";

import { juniors, seniors } from "../../constants";
import { auth, fTeacher } from "../../features/selectors";
import {
  resetFTeacher,
  createStudent,
} from "../../features/formTeacher/fTeacherSlice";
import { resetAuth, logoutUser } from "../../features/auth/authSlice";

function CreateStudent({ setIsLoading }) {
  const { authData } = useSelector(auth);
  const level = authData.grade.substring(0, 2);
  
  const { isFTeacherError, isFTeacherSuccess, fTeacherMessage } =
    useSelector(fTeacher);

  const compress = new Compress();

  const [formData, setFormData] = useState({
    name: "",
    grade: authData?.grade,
    suffix: authData?.suffix,
    role: "student",
    password: "",
    subjects: [],
    image: "",
    dob: ""
  });
  const [subjects, setSubjects] = useState(level === "ss" ? seniors : juniors);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFTeacherSuccess) {
      enqueueSnackbar(fTeacherMessage, { variant: "success" });

      setFormData({
        name: "",
        grade: authData.grade,
        suffix: authData.suffix,
        role: "student",
        password: "",
        subjects: [],
        image: "",
        dob: "",
      });

      setSubjects(level === "ss" ? seniors : juniors);

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

  const handleGeneratePassword = (e) => {
    setFormData((prev) => ({ ...prev, password: "" }));
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

    if(!formData.image) {
      return enqueueSnackbar("Check Password", { variant: "error" });
    }

    if(!formData.dob) {
      return enqueueSnackbar("Check Date of Birth", { variant: "error" });
    }

    if (!formData.password) {
      return enqueueSnackbar("Invalid Password", { variant: "error" });
    }
    dispatch(createStudent({...formData, password: formData.name.split(" ")[0]}));
  };
  return (
    <Container className="pb-5 mt-3">
      <Row className="justify-content-center">
        <Col lg="6" md="12" sm="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2">
                <h4>Create Teachers Form</h4>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={handleSubmit}>
                <InputBox
                  placeholder="Name"
                  name="name"
                  onChange={handleInputChange}
                  value={formData.name}
                />
                <InputBox
                  label="Select Passport"
                  name="photo"
                  onChange={handleFile}
                  type="file"
                  value={formData.image}
                  accept=".jpg, .jpeg, .png"
                />
                <InputBox
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  // readonly
                />
                <FormGroup>
                  <label className="text-sm">Date of Birth</label>
                  <Input
                    className="form-control-alternative"
                    name="dob"
                    type="date"
                    onChange={handleInputChange}
                    value={
                      formData?.dob &&
                      new Date(formData?.dob).toISOString().slice(0, 10)
                    }
                  />
                </FormGroup>
                <Row>
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

                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Create Student
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

export default CreateStudent;

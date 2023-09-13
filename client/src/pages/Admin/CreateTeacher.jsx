import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "reactstrap";

import {
  resetAdmin,
  createTeacher as CTAction,
} from "../../features/admin/adminSlice";
import { logoutUser } from "../../features/auth/authActions";
import { admin } from "../../features/selectors";
import { seniors, juniors } from "../../constants";

import InputBox from "../../components/Input";

const options = [
  { value: "default", text: "Select Teacher Type" },
  { value: "form-teacher", text: "Form Teacher" },
  { value: "sub-teacher", text: "Subject Teacher" },
];

const allGrades = [
  { checked: false, text: "JS1", name: "js1" },
  { checked: false, text: "JS2", name: "js2" },
  { checked: false, text: "JS3", name: "js3" },
  { checked: false, text: "SS1", name: "ss1" },
  { checked: false, text: "SS2", name: "ss2" },
  { checked: false, text: "SS3", name: "ss3" },
];
const suffixes = [
  { text: "Gold", name: "gold" },
  { text: "Silver", name: "silver" },
  { text: "Diamond", name: "diamond" },
  { text: "Bronze", name: "bronze" },
];

const subjects = [...seniors, ...juniors];

function CreateTeacher({setIsLoading}) {
  const compress = new Compress()

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    grade: "",
    role: "",
    password: "",
    subject: "",
    grades: [],
    image: ""
  });

  const [grades, setGrades] = useState(allGrades);

  const dispatch = useDispatch();
  const { isAdminSuccess, adminMessage, isAdminError } = useSelector(admin);

  useEffect(() => {
    if (isAdminSuccess) {
      enqueueSnackbar(adminMessage, { variant: "success" });

      setFormData({
        name: "",
        username: "",
        grade: "",
        role: "",
        password: "",
        subject: "",
        grades: [],
      });

      setGrades(allGrades);

      dispatch(resetAdmin());
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

  const handleGeneratePassword = (e) => {
    setFormData((prev) => ({ ...prev, [formData.password]: "" }));
  };

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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddClass = (e, index) => {
    setGrades(
      grades.map((grade, currentIndex) =>
        currentIndex === index ? { ...grade, checked: !grade.checked } : grade
      )
    );

    const findOne = formData.grades.find((grade) => grade === e.target.name);

    if (findOne) {
      const newGrades = formData.grades.filter(
        (grade) => grade !== e.target.name
      );
      formData.grades = newGrades;
    } else {
      formData.grades.push(e.target.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subject, grades, ...formTeacher } = formData;
    const { grade, suffix, ...subTeacher } = formData;

    if (formData.role === "sub-teacher") {
      console.log(subTeacher);
      dispatch(CTAction(subTeacher));
    }

    if (formData.role === "form-teacher") {
      console.log(formTeacher);
      // dispatch(CTAction(formTeacher));
    }
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
                  placeholder="Username"
                  name="username"
                  onChange={handleInputChange}
                  value={formData.username}
                />
                <InputBox
                  name="photo"
                  onChange={handleFile}
                  type="file"
                  value={formData.image}
                  accept=".jpg, .jpeg, .png"
                />
                <InputBox
                  type="select"
                  options={options}
                  name="role"
                  onChange={handleInputChange}
                  value={formData.role}
                />
                {formData.role === "form-teacher" && (
                  <div>
                    <Row className="align-content-left">
                      {grades.map((grade, index) => (
                        <Col key={index}>
                          <div className="custom-control custom-radio mb-3">
                            <input
                              className="custom-control-input"
                              id={grade.name}
                              name="grade"
                              type="radio"
                              value={grade.name}
                              onChange={handleInputChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={grade.name}
                            >
                              {grade.text}
                            </label>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    <hr className="my-1" />
                    <Row className="mt-3">
                      {suffixes.map((suffix, index) => (
                        <Col key={index}>
                          <div className="custom-control custom-radio mb-3">
                            <input
                              className="custom-control-input"
                              id={suffix.name}
                              name="suffix"
                              type="radio"
                              value={suffix.name}
                              onChange={handleInputChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={suffix.name}
                            >
                              {suffix.text}
                            </label>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}

                {formData.role === "sub-teacher" && (
                  <div>
                    <Row className="align-content-left">
                      {subjects.map((subject, index) => (
                        <Col key={index} sm="4" md="3" lg="2">
                          <div className="custom-control custom-radio mb-3">
                            <input
                              className="custom-control-input"
                              id={subject.name}
                              name="subject"
                              type="radio"
                              value={subject.name}
                              onChange={handleInputChange}
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
                    <hr className="my-1" />
                    <Row className="mt-3">
                      {grades.map((grade, index) => (
                        <Col key={index}>
                          <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              type="checkbox"
                              name={grade.name}
                              id={grade.name}
                              checked={grade.checked}
                              onChange={(e) => handleAddClass(e, index)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={grade.name}
                            >
                              {grade.text}
                            </label>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
                <InputBox
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Create Teacher
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

export default CreateTeacher;

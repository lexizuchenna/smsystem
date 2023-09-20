import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import InputAddon from "../../components/InputAddon";
import AuthFooter from "../../components/Footer/AuthFooter";
import InputBox from "../../components/Input";

const options = [
  { value: "default", text: "Select Login User" },
  { value: "admin", text: "Admin" },
  { value: "form-teacher", text: "Form Teacher" },
  { value: "sub-teacher", text: "Subject Teacher" },
  { value: "student", text: "Student" },
];

import { loginUser, resetAuth } from "../../features/auth/authSlice";
import { auth } from "../../features/selectors";

const user = JSON.parse(localStorage.getItem("user"));

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthError, authMessage, isAuthLoading, isAuthSuccess, authData } =
    useSelector(auth);

  useEffect(() => {
    if (authData) return navigate(`/${authData.role}/dashboard`);

    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthError) {
      enqueueSnackbar(authMessage ? authMessage : "", { variant: "error" });
      dispatch(resetAuth());
    }

    if (isAuthSuccess && authData) {
      navigate(`/${authData.role}/dashboard`);
    }
  }, [isAuthSuccess, isAuthError]);

  const handleLogin = () => {
    console.log(formData);
    if (!formData.username || !formData.password) {
      return enqueueSnackbar("Fill all fields", { variant: "error" });
    }
    dispatch(loginUser(formData));
  };

  const handleLoginData = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (value === "admin") {
      return setFormData({ username: "admin", password: "Ab123456" });
    }
    if (value === "form-teacher") {
      return setFormData({ username: "form-teacher", password: "Ab123456" });
    }
    if (value === "sub-teacher") {
      return setFormData({ username: "sub-teacher", password: "Ab123456" });
    }
    if (value === "student") {
      return setFormData({ username: "student", password: "Ab123456" });
    }

    return setFormData({ username: "", password: "" });
  };

  return (
    <>
      <div className="main-content">
        {/* <AuthNavbar /> */}
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent">
                  <div className="text-muted text-center mt-2">
                    <h4>Welcome to School Management Portal</h4>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>
                      Select user to login <br />
                      Login form will be used in production
                    </small>
                  </div>
                  <Form role="form">
                    <InputBox
                      type="select"
                      options={options}
                      name="role"
                      onChange={handleLoginData}
                      value={formData.username}
                    />
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={handleLogin}
                      >
                        Sign in
                      </Button>
                    </div>
                    <hr />
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputAddon text="@" />
                        <Input
                          placeholder="Username"
                          type="text"
                          name="username"
                          autoComplete="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">*</span>
                        </div>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="custom-control custom-control-alternative custcvom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                        onChange={(e) => console.log(e.target.checked)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="12" className="text-center">
                  <a className="text-light" onClick={() => {}}>
                    <small>Made with ❤️ by Lexiz Tech</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
}

export default Auth;

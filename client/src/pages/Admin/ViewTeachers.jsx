import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Card,
  Col,
  CardHeader,
} from "reactstrap";

import { logoutUser } from "../../features/auth/authSlice";
import { auth } from "../../features/selectors";

const BASE_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

function ViewTeachers({ setIsLoading }) {
  const [formTeachers, setFormTeachers] = useState([]);
  const [subTeachers, setSubTeachers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { authData } = useSelector(auth);

  const config = {
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  };

  const handleDelete = () => {};

  const handleEdit = () => {};

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/api/get-teachers`, config)
      .then((response) => {
        const { data } = response;
        setFormTeachers(data.formTeachers);
        setSubTeachers(data.subTeachers);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        const message = error.response.data || error.message;
        if (message === "Jwt Expired") {
          dispatch(logoutUser());
          enqueueSnackbar(message, { variant: "error" });
          return navigate("/");
        }
      });
  }, []);

  return (
    <Container className="pb-5 mt-3">
      <Row className="justify-content-center">
        <Col lg="12" md="12" sm="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2">
                <h4>View All Teachers</h4>
              </div>
            </CardHeader>
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2">
                <h4>Form Teachers Teachers</h4>
              </div>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Role</th>
                  <th scope="col">Class</th>
                  <th scope="col">Suffix</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {formTeachers &&
                  formTeachers.map((teacher, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <span className="avatar rounded-circle mr-3">
                            <img alt="..." src="" />
                          </span>
                          <Media>
                            <span className="mb-0 text-sm">{teacher.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{teacher.username}</td>
                      <td>{teacher.role}</td>
                      <td>{teacher.grade}</td>
                      <td>{teacher.suffix}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            role="button"
                            size="sm"
                            color="dark"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" end>
                            <DropdownItem href="#" onClick={handleEdit}>
                              Edit
                            </DropdownItem>
                            <DropdownItem href="#" onClick={handleDelete}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2">
                <h4>Subject Teachers</h4>
              </div>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Role</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Classes</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {subTeachers &&
                  subTeachers.map((teacher, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <span className="avatar rounded-circle mr-3">
                            <img alt="..." src="" />
                          </span>
                          <Media>
                            <span className="mb-0 text-sm">{teacher.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{teacher.username}</td>
                      <td>{teacher.role}</td>
                      <td>{teacher.subject}</td>
                      <td>
                        <Media>
                          {teacher.grades.map((grade, index) => (
                            <span
                              className="text-primary"
                              style={{ textTransform: "uppercase" }}
                              key={index}
                            >
                              {grade}, &nbsp;
                            </span>
                          ))}
                        </Media>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            role="button"
                            size="sm"
                            color="dark"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" end>
                            <DropdownItem href="#" onClick={handleEdit}>
                              Edit
                            </DropdownItem>
                            <DropdownItem href="#" onClick={handleDelete}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewTeachers;

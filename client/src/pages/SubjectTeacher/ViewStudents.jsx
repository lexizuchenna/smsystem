import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
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

import { auth } from "../../features/selectors";

const BASE_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

function ViewStudents({ setIsLoading }) {
  const [students, setStudents] = useState([]);

  const { authData } = useSelector(auth);
  const navigate = useNavigate();
  const { grade } = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  };

  const handleView = (username) => {
    navigate(`/sub-teacher/create-result/${username}`);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/api/get-students/${grade}`, config)
      .then((response) => {
        const { data } = response;
        setStudents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar(error.message, { variant: "error" });
      });
  }, []);
  return (
    <Container className="pb-5 mt-3">
      <Row className="justify-content-center">
        <Col lg="12" md="12" sm="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2">
                <h4>View All Student</h4>
              </div>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Class</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.map((student, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <span className="avatar rounded-circle mr-3">
                            <img alt="..." src={student?.image} width="48px" height="48px" />
                          </span>
                          <Media>
                            <span className="mb-0 text-sm">{student.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{student.username}</td>
                      <td>{student.grade}</td>
                      
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#"
                            role="button"
                            size="sm"
                            color="dark"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" end>
                            <DropdownItem
                              onClick={() => handleView(student.username)}
                            >
                              View
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

export default ViewStudents;

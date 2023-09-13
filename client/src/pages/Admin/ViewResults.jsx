import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
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
  Button,
} from "reactstrap";

const BASE_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

import { auth } from "../../features/selectors";

function ViewResults({ setIsLoading }) {
  const { authData } = useSelector(auth);
  const [results, setResults] = useState([]);
  const location = useLocation()

  const { term, grade } = location.state;
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  };

  const handleResult = (username, session) => {
    navigate(`/admin/result/${username}/${session}/${term}`);
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/get-record`, config);
        const result = await axios.get(
          `${BASE_URL}/api/get-results/${grade}/${data.session}/${term}`,
          config
        );

        setResults(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const message = error?.response?.data || error.message;
        enqueueSnackbar(message, { variant: "error" });
      }
    })();
  }, []);

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
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {results.length ? 
                  results.map((result, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{result.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{result.username}</td>
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
                            <DropdownItem
                              onClick={() =>
                                handleResult(result.username, result.session)
                              }
                            >
                              View
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))
                 : (
                  <tr>
                    <td scope="row">No Result Available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewResults;

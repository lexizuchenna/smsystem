import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

const BASE_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

import { admin, auth } from "../../features/selectors";
import { termOptions, sessionOptions } from "../../constants";


function Sessions({ setIsLoading }) {
  const [records, setRecords] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { authData } = useSelector(auth);

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
        const { data } = await axios.get(`${BASE_URL}/api/get-records`, config);

        setRecords(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const message = error?.response?.data || error.message;
        enqueueSnackbar(message, { variant: "error" });
        if (message === "Jwt Expired") {
          dispatch(logoutUser());
          return navigate("/");
        }
      }
    })();
  }, []);

  const handleNext = (session) => {
    return navigate(`/admin/session/`, {state: {session}})
  };

  return (
    <Container className="pb-5 mt-3">
      <Row className="justify-content-center">
        <Col lg="12" md="12" sm="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2">
                <h4>Select Session</h4>
              </div>
            </CardHeader>
            <CardBody>
              <Row className="align-items-center justify-content-center">
                {records &&
                  records.map((session) => (
                    <Col key={session} sm="4">
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={() => handleNext(session)}
                        >
                          {session}
                        </Button>
                      </div>
                    </Col>
                  ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Sessions;

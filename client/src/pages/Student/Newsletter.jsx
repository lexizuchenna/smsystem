import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  CardHeader,
  CardBody,
} from "reactstrap";

const BASE_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

import { auth } from "../../features/selectors";

function Newsletter({ setIsLoading }) {
  const [record, setRecord] = useState([]);
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
        const { data } = await axios.get(`${BASE_URL}/api/get-record`, config);

        setRecord(data);
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
  return (
    <Container className="pb-5 mt-3">
      <Row className="justify-content-center">
        <Col lg="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2">
                <h4>Newsletter</h4>
              </div>
            </CardHeader>
            <CardBody>
              <Row className="align-items-center px-3">
                {record && <p dangerouslySetInnerHTML={{__html: record.newsletter}} />}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Print
                  </Button>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Newsletter;

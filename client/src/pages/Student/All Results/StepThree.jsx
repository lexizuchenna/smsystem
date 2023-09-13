import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  CardHeader,
  CardBody,
  Form,
} from "reactstrap";

const BASE_URL =
  import.meta.env.VITE_MODE === "DEV"
    ? import.meta.env.VITE_BASE_URL_TEST
    : import.meta.env.VITE_BASE_URL_LIVE;

import InputBox from "../../../components/Input";
import { auth } from "../../../features/selectors";

function StepThree({ setStep, setResultData, resultData, setIsLoading }) {
  const [verified, setVerified] = useState(false);
  const { authData } = useSelector(auth);
  const [pin, setPin] = useState("");

  const username = authData.username;
  const session = resultData.session;
  const term = resultData.term;

  const config = {
    headers: {
      Authorization: `Bearer ${authData.token}`,
    },
  };

  

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/result/verify?username=${username}&term=${term}&session=${session}`,
          config
        );

        setIsLoading(false);
        console.log(data)
        if (data === "Verified") setVerified(true);
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

  const handlePrev = () => {
    setStep((prev) => prev - 1);
    setResultData((prev) => ({ ...prev, term: "" }));
  };
  
  const handleViewResult = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/result?username=${username}&session=${session}&term=${term}&pin=${pin}`,
        config
      );
      setIsLoading(false);

      const newTab = window.open();
      newTab.document.open();
      newTab.document.write(data);
      newTab.document.close();
    } catch (error) {
      setIsLoading(false);
      const message = error?.response?.data || error.message;
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const handlePin = (e) => {
    e.preventDefault()
    e.persist()

    e.target.value = e.target.value.slice(0, 12)
    setPin(e.target.value)
  }

  return (
    <Container className="pb-5 mt-3">
      <Row className="justify-content-center">
        <Col lg="12" md="12" sm="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <Col className="text-left text-md" xs="6">
                <Button color="dark" onClick={handlePrev} size="md">
                  Back
                </Button>
              </Col>
              <div className="text-muted text-center mt-2">
                <h4>Enter PIN</h4>
              </div>
            </CardHeader>
            <CardBody>
              {verified && (
                <Form role="form" onSubmit={handleViewResult}>
                  <InputBox
                    placeholder="1234567890..."
                    name="pin"
                    label="Enter Result PIN"
                    type="number"
                    onChange={handlePin}
                    value={pin}
                  />
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Check Result
                    </Button>
                  </div>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StepThree;

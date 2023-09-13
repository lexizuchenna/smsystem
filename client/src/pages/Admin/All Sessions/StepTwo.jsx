import {
  Button,
  Container,
  Row,
  Card,
  Col,
  CardHeader,
  CardBody,
} from "reactstrap";

const terms = ["1st", "2nd", "3rd"];

function StepTwo({ setStep, setResultsData }) {
  const handleNext = (term) => {
    setStep((prev) => prev + 1);
    setResultsData((prev) => ({ ...prev, term }));
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
    setResultsData((prev) => ({ ...prev, session: "" }));
  };

  

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
                <h4>Select Term</h4>
              </div>
            </CardHeader>
            <CardBody>
              <Row className="align-items-center justify-content-center">
                {terms &&
                  terms.map((term) => (
                    <Col key={term} sm="4">
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={() => handleNext(term)}
                        >
                          {term}
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

export default StepTwo;

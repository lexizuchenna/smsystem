import {
  Button,
  Container,
  Row,
  Card,
  Col,
  CardHeader,
  CardBody,
} from "reactstrap";

const grades = ["js1", "js2", "js3", "ss1", "ss2", "ss3"];

function StepThree({ setStep, setResultsData }) {
  const handleNext = (grade) => {
    setStep((prev) => prev + 1);
    setResultsData((prev) => ({ ...prev, grade }));
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
    setResultsData((prev) => ({ ...prev, term: "" }));
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
                {grades &&
                  grades.map((grade) => (
                    <Col key={grade} sm="4">
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={() => handleNext(grade)}
                        >
                          {grade.toUpperCase()}
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

export default StepThree;

import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Card,
  Col,
  CardHeader,
  CardBody,
} from "reactstrap";

const grades = ["JS1", "JS2", "JS3", "SS1", "SS2", "SS3"];

function Results() {
  const navigate = useNavigate();

  const handleNext = (grade) => {
    navigate(`/admin/select-term`, {state: grade});
  };
  return (
    <Container className="pb-5 mt-3">
      <Row className="justify-content-center">
        <Col lg="12" md="12" sm="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2">
                <h4>Select Class</h4>
              </div>
            </CardHeader>
            <CardBody>
              <Row className="align-items-center justify-content-center">
                {grades.map((grade) => (
                  <Col key={grade} sm="4">
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={() => handleNext(grade)}
                      >
                        {grade}
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

export default Results;

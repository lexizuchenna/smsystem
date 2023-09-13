import { useNavigate, useLocation } from "react-router-dom";
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

function Results2() {
  const navigate = useNavigate();
  const location = useLocation();

  const grade = location.state.toLowerCase();

  const handleView = (term) => {
    navigate(`/admin/results/`, { state: { grade, term } });
  };
  return (
    <Container className="pb-5 mt-3">
      <Row className="justify-content-center">
        <Col lg="12" md="12" sm="12">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <Col className="text-left text-md" xs="12">
                <Button
                  color="dark"
                  onClick={() => window.history.back()}
                  size="md"
                >
                  Back
                </Button>
              </Col>
              <div className="text-muted text-center mt-2">
                <h4>Select Term</h4>
              </div>
            </CardHeader>
            <CardBody>
              <Row className="align-items-center justify-content-center">
                {terms.map((term) => (
                  <Col key={term}>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={() => handleView(term)}
                      >
                        {term} Term
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

export default Results2;

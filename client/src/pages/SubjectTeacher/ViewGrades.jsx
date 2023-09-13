import { useSelector } from "react-redux";
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

import { auth } from "../../features/selectors";

function ViewGrades() {
  const { authData } = useSelector(auth);
  const navigate = useNavigate();

  const handleView = (grade) => {
    navigate(`/sub-teacher/view-students/${grade}`);
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
                {authData.grades.map((grade) => (
                  <Col key={grade}>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={() => handleView(grade)}
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

export default ViewGrades;

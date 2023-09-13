import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

function Dashboard() {
  return (
    <Row className="mt-5">
      <Col lg="6" xl="3">
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  TEACHERS
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">350,897</span>
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                  <i className="fas fa-chart-bar" />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-nowrap">Available Users</span>
            </p>
          </CardBody>
        </Card>
      </Col>
      <Col lg="6" xl="3">
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  students
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">2,356</span>
              </div>
              <Col className="col-auto">
                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                  <i className="fas fa-chart-pie" />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-danger mr-2">
                <i className="fas fa-arrow-down" /> 3.48%
              </span>{" "}
              <span className="text-nowrap">Since last week</span>
            </p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Dashboard;

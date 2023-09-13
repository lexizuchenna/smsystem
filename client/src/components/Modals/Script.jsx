import { Button, Card, CardBody, Modal, Row, Col } from "reactstrap";
const ScriptModal = ({ isOpen, toggle, image }) => {
  return (
    <>
      <Row>
        <Col>
          <Modal
            className="modal-dialog-centered"
            isOpen={isOpen}
            toggle={toggle}
            style={{ width: "fit-content" }}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="py-lg-5">
                  <img src={image} alt="" />
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="dark"
                        type="button"
                        onClick={toggle}
                      >
                        Close
                      </Button>
                    </div>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default ScriptModal;

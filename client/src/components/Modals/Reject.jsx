import { useState } from "react";
import { Button, Modal, Row, Col, Form, Input } from "reactstrap";

const RejectModal = ({ isOpen, toggle, RejectBtn, RejectBtnProps }) => {
  const [message, setMessage] = useState("")
  const props = {
    ...RejectBtnProps, message
  }
  return (
    <>
      <Row>
        <Col md="4">
          <Modal
            className="modal-dialog-centered"
            isOpen={isOpen}
            toggle={toggle}
          >
            <div className="modal-header">
              <h6 className="modal-title" style={{ fontSize: "16px" }}>
                Reject
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggle}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Enter Message</p>
              <Form>
                <Input
                  name="message"
                  placeholder="Write reason for rejection"
                  rows="3"
                  type="textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form>
            </div>
            <div className="modal-footer">
              <RejectBtn {...props} />
              <Button
                className="ml-auto"
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={toggle}
              >
                Close
              </Button>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default RejectModal;

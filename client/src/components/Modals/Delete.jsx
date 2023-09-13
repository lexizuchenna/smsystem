import { Button, Modal, Row, Col, Form, Input } from "reactstrap";

const DeleteModal = ({ isOpen, toggle, DeleteBtn }) => {
  
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
                Delete Session
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
              <p>Are you sure you want to delete this session</p>
            </div>
            <div className="modal-footer">
              <DeleteBtn />
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

export default DeleteModal;

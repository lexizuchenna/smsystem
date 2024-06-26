import { useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
} from "reactstrap";

const DefaultModal = ({isOpen, title, toggle}) => {
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
              <h6 className="modal-title" id="modal-title-default">
                {title}
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => toggleModal()}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
              <p>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia. It is a paradisematic country, in
                which roasted parts of sentences fly into your mouth.
              </p>
            </div>
            <div className="modal-footer">
              <Button color="primary" type="button">
                Save changes
              </Button>
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

export default DefaultModal;

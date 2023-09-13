import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";

const FormModal = () => {
  const [defaultModal, setDefaultModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [formModal, setFormModal] = useState(false);

  const toggleModal = (state) => {
    switch (state) {
      case "defaultModal":
        setDefaultModal(!defaultModal);
        break;
      case "notificationModal":
        setNotificationModal(!notificationModal);
        break;
      case "formModal":
        setFormModal(!formModal);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Row>
        <Col md="4">
          <Button
            block
            className="mb-3"
            color="primary"
            type="button"
            onClick={() => toggleModal("defaultModal")}
          >
            Default
          </Button>
          <Modal
            className="modal-dialog-centered"
            isOpen={defaultModal}
            toggle={() => toggleModal("defaultModal")}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                Type your modal title
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => toggleModal("defaultModal")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Far far away, behind the word mountains, far from the
                countries Vokalia and Consonantia, there live the blind
                texts. Separated they live in Bookmarksgrove right at the
                coast of the Semantics, a large language ocean.
              </p>
              <p>
                A small river named Duden flows by their place and supplies
                it with the necessary regelialia. It is a paradisematic
                country, in which roasted parts of sentences fly into your
                mouth.
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
                onClick={() => toggleModal("defaultModal")}
              >
                Close
              </Button>
            </div>
          </Modal>
        </Col>
        <Col md="4">
          <Button
            block
            className="mb-3"
            color="warning"
            type="button"
            onClick={() => toggleModal("notificationModal")}
          >
            Notification
          </Button>
          <Modal
            className="modal-dialog-centered modal-danger"
            contentClassName="bg-gradient-danger"
            isOpen={notificationModal}
            toggle={() => toggleModal("notificationModal")}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-notification">
                Your attention is required
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => toggleModal("notificationModal")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="py-3 text-center">
                <i className="ni ni-bell-55 ni-3x" />
                <h4 className="heading mt-4">You should read this!</h4>
                <p>
                  A small river named Duden flows by their place and
                  supplies it with the necessary regelialia.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <Button className="btn-white" color="default" type="button">
                Ok, Got it
              </Button>
              <Button
                className="text-white ml-auto"
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={() => toggleModal("notificationModal")}
              >
                Close
              </Button>
            </div>
          </Modal>
        </Col>
        <Col md="4">
          <Button
            block
            color="default"
            type="button"
            onClick={() => toggleModal("formModal")}
          >
            Form
          </Button>
          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={formModal}
            toggle={() => toggleModal("formModal")}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-3">
                    <small>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="btn-inner--icon">
                        <img
                          alt="..."
                          src={require("assets/img/icons/common/github.svg").default}
                        />
                      </span>
                      <span className="btn-inner--text">Github</span>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="btn-inner--icon">
                        <img
                          alt="..."
                          src={require("assets/img/icons/common/google.svg").default}
                        />
                      </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                      >
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default FormModal;

import { Button, Modal, Form, Col, Row, Container } from "react-bootstrap";

import { CardImg } from "./Meme.js";

function InfoModal(props) {
  const handleClose = function () {
    props.setinfoModalShow(false);
  };

  return (
    <Modal show={props.infoModalShow} onHide={handleClose} size="lg" centered>
      <Modal.Header>
        <Modal.Title className="text-info">Info Meme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Container fluid>
            <Row>
              <Col>
                <CardImg
                  position={props.meme.base.position}
                  path={props.meme.base.path}
                  frase1={props.meme.text1}
                  frase2={props.meme.text2}
                  frase3={props.meme.text3}
                  color={props.meme.color}
                  font={props.meme.font}
                  enne={props.meme.base.n}
                />
              </Col>
              <Col>
                <Form.Group controlId="formBasicDescription">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="description"
                    disabled
                    value={props.meme.title}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                  <Form.Label>Creator</Form.Label>
                  <Form.Control
                    type="description"
                    disabled
                    value={props.meme.creator}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicDescription">
                  {props.meme.text1 ? (
                    <>
                      {" "}
                      <Form.Label>Text1</Form.Label>
                      <Form.Control
                        disabled
                        type="description"
                        value={props.meme.text1}
                        className="mb-2"
                      />
                    </>
                  ) : null}
                  {props.meme.text2 ? (
                    <>
                      {" "}
                      <Form.Label>Text2</Form.Label>
                      <Form.Control
                        className="mb-2"
                        disabled
                        type="description"
                        value={props.meme.text2}
                      />
                    </>
                  ) : null}
                  {props.meme.text3 ? (
                    <>
                      {" "}
                      <Form.Label>Text3</Form.Label>
                      <Form.Control
                        className="mb-2"
                        disabled
                        type="description"
                        value={props.meme.text3}
                      />
                    </>
                  ) : null}
                </Form.Group>

                <Form.Group className="mr-2">
                  <Form.Check
                    disabled
                    type="checkbox"
                    id="idProtected"
                    label="Protected"
                    checked={props.meme.protect}
                    value={props.meme.protect}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>

          <Modal.Footer className="p-0">
            <div className="mt-3">
              <Button
                className="mx-3"
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default InfoModal;

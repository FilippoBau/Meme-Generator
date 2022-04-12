import {
  Button,
  Modal,
  Form,
  Col,
  Dropdown,
  Container,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { CardImg } from "./Meme.js";

function AddModal(props) {
  const [validated, setValidated] = useState(false);

  const [title, setTitle] = useState(props.meme ? props.meme.title : "");
  const [frase1, setText1] = useState(props.meme ? props.meme.text1 : "");
  const [frase2, setText2] = useState(props.meme ? props.meme.text2 : "");
  const [frase3, setText3] = useState(props.meme ? props.meme.text3 : "");
  const [protect, setProtect] = useState(
    props.meme ? props.meme.protect : false
  );
  const [color, setColor] = useState(props.meme ? props.meme.color : "white");
  const [font, setFont] = useState(
    props.meme ? props.meme.font : "Times New Roman"
  );
  const [path, setPath] = useState(
    props.meme ? props.meme.base.path : props.bases[0].path
  );
  const [enne, setEnne] = useState(
    props.meme ? props.meme.base.n : props.bases[0].n
  );
  const [position, setPotion] = useState(
    props.meme ? props.meme.base.position : props.bases[0].position
  );
  const [id_base, setId_base] = useState(
    props.meme ? props.meme.base.id : props.bases[0].id
  );

  const resetpart = (n) => {
    if (n === 1) {
      setText2("");
      setText3("");
      setPotion("bottom-m");
    }
    if (n === 2) {
      setText3("");
      setPotion("top-bottom-m");
    }
    if (n === 3) {
      setPotion("top-center-bottom-m");
    }
    setEnne(n);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      (frase1.length === 0 && frase2.length === 0 && frase3.length === 0)
    ) {
      setValidated(true);
    } else {
      props.setprocessing(true);
      props.addMeme(
        id_base,
        title,
        frase1,
        frase2,
        frase3,
        font,
        color,
        protect
      );
      handleClose();
    }
  };

  const handleClose = function () {
    props.setAddModalShow(false);
    if (props.meme === undefined) {
      setTitle("");
      setText1("");
      setText2("");
      setText3("");
      setProtect(false);
      setColor("white");
      setFont("arial");
      setPath("Images/futurama.jpg");
      setEnne(2);
      setPotion("top-bottom-m");
      setValidated(false);
    } else {
      setTitle(props.meme.title);
      setText1(props.meme.text1);
      setText2(props.meme.text2);
      setText3(props.meme.text3);
      setProtect(props.meme.protect);
      setColor(props.meme.color);
      setFont(props.meme.font);
      setPath(props.meme.base.path);
      setEnne(props.meme.base.n);
      setPotion(props.meme.base.position);
      setValidated(false);
    }
  };

  return (
    <Modal show={props.addModalShow} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-info">
          {props.meme ? "Copy" : "Add"} Meme
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col>
                <CardImg
                  position={position}
                  path={path}
                  frase1={frase1}
                  frase2={frase2}
                  frase3={frase3}
                  color={color}
                  font={font}
                  enne={enne}
                />
                {!props.meme && props.bases ? (
                  <Dropdown className="m-2">
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                      Select Image
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {props.bases.map((x, ind) => (
                        <Dropdown.Item
                          key={ind}
                          onClick={(e) => {
                            setPath(x.path);
                            resetpart(x.n);
                            setId_base(x.id);
                          }}
                        >
                          {x.title}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : null}
              </Col>
              <Col>
                <Form.Row className="mb-2">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Insert title"
                      value={title}
                      onChange={(ev) => setTitle(ev.target.value)}
                    />
                    <Form.Control.Feedback className="ml-1" type="invalid">
                      You have to fill this field!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mb-2">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Text1</Form.Label>
                    <Form.Control
                      isInvalid={validated}
                      required={
                        frase1.length === 0 &&
                        frase2.length === 0 &&
                        frase3.length === 0
                      }
                      maxLength={200}
                      type="text"
                      placeholder="Insert text"
                      value={frase1}
                      onChange={(ev) =>
                        setText1(
                          ev.target.value.length > 200
                            ? ev.target.value.slice(0, 200)
                            : ev.target.value
                        )
                      }
                    />
                    <Form.Control.Feedback className="ml-1" type="invalid">
                      You have to fill at least one of the text fields but with
                      a max of 200 characters!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                {enne >= 2 ? (
                  <Form.Row className="mb-2">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Text2</Form.Label>
                      <Form.Control
                        isInvalid={validated}
                        required={
                          frase1.length === 0 &&
                          frase2.length === 0 &&
                          frase3.length === 0
                        }
                        maxLength={200}
                        disabled={enne < 2}
                        type="text"
                        placeholder="Insert text"
                        value={frase2}
                        onChange={(ev) => setText2(ev.target.value)}
                      />
                      <Form.Control.Feedback className="ml-1" type="invalid">
                        you have to fill at least one of the text fields but
                        with a max of 200 characters!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                ) : null}

                {enne === 3 ? (
                  <Form.Row className="mb-2">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Text3</Form.Label>
                      <Form.Control
                        isInvalid={validated}
                        required={
                          frase1.length === 0 &&
                          frase2.length === 0 &&
                          frase3.length === 0
                        }
                        maxLength={200}
                        disabled={enne < 3}
                        type="text"
                        placeholder="Insert text"
                        value={frase3}
                        onChange={(ev) => setText3(ev.target.value)}
                      />
                      <Form.Control.Feedback className="ml-1" type="invalid">
                        you have to fill at least one of the text fields but
                        with a max of 200 characters!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                ) : null}

                <Form.Row className="mb-2 justify-content-between ">
                  <Form.Group className="mr-2">
                    <Form.Check
                      disabled={
                        props.oldBool && props.iduser !== props.meme.idCreator
                      }
                      type="checkbox"
                      id="idProtected"
                      label="Protected"
                      checked={protect}
                      value={protect}
                      onChange={(ev) => setProtect((el) => !el)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Dropdown>
                      <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Font
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => setFont("arial")}>
                          Arial
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => setFont("Times new Roman")}
                        >
                          Times New Roman
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>

                  <Form.Group>
                    <Dropdown>
                      <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Color
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => setColor("white")}>
                          White
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setColor("red")}>
                          Red
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setColor("blue")}>
                          Blue
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e) => setColor("green")}>
                          Green
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                </Form.Row>
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
              <Button type="submit" variant="info">
                {props.meme ? "Copy" : "Add"}{" "}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;

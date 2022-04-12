import { Container, Card, Button, Spinner } from "react-bootstrap";

function CardImg(props) {
  const allineamenti = "card-img " + props.position;
  let l1 = "30px";

  let l2 = "30px";
  let l3 = "30px";
  let lh1 = "200%";
  let lh2 = "200%";
  let lh3 = "200%";
  if (props.frase1.length > 13) {
    if (props.frase1.length > 50) {
      if (props.frase1.length > 100) {
        l1 = "14px";
        lh1 = "100%";
      } else {
        l1 = "20px";
        lh1 = "150%";
      }
    } else {
      l1 = "25px";
      lh1 = "150%";
    }
  }
  if (props.frase2.length > 13) {
    if (props.frase2.length > 50) {
      if (props.frase2.length > 100) {
        l2 = "14px";
        lh2 = "100%";
      } else {
        l2 = "20px";
        lh2 = "150%";
      }
    } else {
      l2 = "25px";
      lh2 = "150%";
    }
  }
  if (props.frase3.length > 13) {
    if (props.frase3.length > 50) {
      if (props.frase3.length > 100) {
        l3 = "14px";
        lh3 = "100%";
      } else {
        l3 = "20px";
        lh3 = "150%";
      }
    } else {
      l3 = "25px";
      lh3 = "150%";
    }
  }

  return (
    <section
      style={{
        backgroundImage: "url(" + props.path + ")",
        color: props.color,
        fontFamily: props.font,
      }}
      className={allineamenti}
    >
      <div style={{ fontSize: l1, lineHeight: lh1 }}>{props.frase1}</div>
      {props.enne >= 2 ? (
        <div style={{ fontSize: l2, lineHeight: lh2 }}>{props.frase2}</div>
      ) : null}
      {props.enne === 3 ? (
        <div style={{ fontSize: l3, lineHeight: lh3 }}>{props.frase3}</div>
      ) : null}
    </section>
  );
}

function Meme(props) {
  return (
    <Container>
      <Card style={{ width: "302px" }}>
        <CardImg
          position={props.image.base.position}
          path={props.image.base.path}
          frase1={props.image.text1}
          frase2={props.image.text2}
          frase3={props.image.text3}
          color={props.image.color}
          font={props.image.font}
          enne={props.image.base.n}
        />
        <Card.Body>
          <Card.Title>
            {props.image.title.length > 30
              ? props.image.title.slice(0, 27) + "..."
              : props.image.title}
          </Card.Title>
          <Container className="d-flex justify-content-between">
            {props.image.prov ? (
              <Spinner
                className="d-inline ml-3 align-self-center"
                animation="border"
                variant="info"
              />
            ) : (
              <>
                <Button
                  variant="primary"
                  className="m-1"
                  onClick={() => {
                    props.setinfoModalShow(true);
                  }}
                >
                  Info
                </Button>
                {props.username ? (
                  <Button
                    variant="warning"
                    className="m-1"
                    onClick={
                      props.adding
                        ? () => {
                            props.seterrshow(true);
                            props.seterr({
                              message: "Attention",
                              details:
                                "Cannot add/copy more meme at the same time",
                            });
                          }
                        : () => props.setcopyModalShow(true)
                    }
                  >
                    copy
                  </Button>
                ) : null}
                {props.username && props.iduser === props.image.idCreator ? (
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={
                      props.deleting
                        ? () => {
                            props.seterrshow(true);
                            props.seterr({
                              message: "Attention",
                              details:
                                "Cannot delete more meme at the same time",
                            });
                          }
                        : () => {
                            props.setdeleting(true);
                            props.deleteMeme(props.id);
                          }
                    }
                  >
                    delete
                  </Button>
                ) : null}
              </>
            )}
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}

export { Meme, CardImg };

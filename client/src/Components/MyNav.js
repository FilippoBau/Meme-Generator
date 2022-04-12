import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";

export default function MyNav(props) {
  return (
    <>
      <Navbar className="pr-2" bg="info" expand="sm">
        <Container>
          <Navbar.Brand href="/">
            <Icons.EmojiSmileFill size="1.2em" />
            <Icons.EmojiSmileUpsideDownFill size="1.2em" className="m-1" />
            Meme Generator
          </Navbar.Brand>
          <div className="flex-right">
            {props.userName ? (
              <>
                <span>
                  Welcome <b>{props.userName}</b>{" "}
                </span>
                <Button
                  variant="outline-light"
                  className="m-2"
                  onClick={props.logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button variant="outline-light">Login</Button>
              </Link>
            )}{" "}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

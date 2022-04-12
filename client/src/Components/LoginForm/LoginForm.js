import "./LoginForm.css";
import icon from "./icon.png";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { loginUser } from "../../Api/PostApi.js";
import ErrorAlert from "../ErrorAlert";
import { Link } from "react-router-dom";

const LoginForm = ({ ...props }) => {
  const { login, setChecked } = props;
  const [validated, setValidated] = useState(false);
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorDetected, setErrorDetected] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setChecked(false);
      loginUser(mail, password)
        .then((user) => {
          setErrorDetected(false);
          login(user);
          setChecked(true);
        })
        .catch((err) => {
          setErrorDetected(err);
          setChecked(true);
        });
    }
    setValidated(true);
  };
  return (
    <div className="text-center main">
      <Form
        noValidate
        className="form-signin"
        validated={validated}
        onSubmit={handleSubmit}
      >
        <img className="mb-4" src={icon} alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <Form.Group>
          <Form.Control
            onChange={(x) => setmail(x.target.value)}
            value={mail}
            required
            type="email"
            placeholder="Email address"
            id="email"
          />
          <Form.Control
            onChange={(x) => setpassword(x.target.value)}
            value={password}
            required
            type="password"
            placeholder="Password"
            id="password"
          />
          <Form.Control.Feedback type="invalid">
            Insert your account mail address and the password
          </Form.Control.Feedback>
        </Form.Group>
        {errorDetected ? <ErrorAlert errors={errorDetected} /> : null}

        <Button
          className="mb-1"
          size="lg"
          variant="info"
          block={true}
          type="submit"
        >
          Sign in
        </Button>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button size="lg" variant="secondary" block={true} type="reset">
            Go back
          </Button>
        </Link>
        <p className="mt-5 mb-3 text-muted">&copy; Webotic 2021</p>
      </Form>
    </div>
  );
};

export default LoginForm;

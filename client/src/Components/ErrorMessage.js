import { Alert } from "react-bootstrap";

function ErrorMessage({ ...props }) {
  const { setErrShow, err } = props;

  const handleClose = () => setErrShow(false);

  return (
    <Alert variant="danger" onClose={handleClose} dismissible>
      <Alert.Heading>{err.message}</Alert.Heading>
      <p>{err.details}</p>
    </Alert>
  );
}

export default ErrorMessage;

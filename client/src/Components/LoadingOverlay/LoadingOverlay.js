import { Spinner, Alert } from "react-bootstrap";
import "./LoadingOverlay.css";
import cat from "./cat.jpeg";

const LoadingOverlay = () => {
  return (
    <div className="loading d-flex justify-content-center align-items-center ">
      <Alert className="shadow-lg rounded" variant="info">
        <Alert.Heading>We are loading data</Alert.Heading>
        <p>Please wait!</p>
        <Spinner animation="border" variant="info" />
         <hr />
        <p className="mb-2">This cute cat will wait with you</p>
        <img
        style={{maxWidth:"270px"}}
          src={cat}
          alt="cute cat"
        /> 
      </Alert>
    </div>
  );
};

export default LoadingOverlay;

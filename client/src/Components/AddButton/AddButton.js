import { Button } from "react-bootstrap";
import "./AddButton.css";

function AddButton(props) {
  return (
    <Button
      className="btn-plus-position btn btn-info rounded-circle"
      style={{ width: "50px", height: "50px", font: "2em sans-serif" }}
      onClick={
        props.adding
          ? () => {
              props.seterrshow(true);
              props.seterr({
                message: "Attention",
                details: "Cannot add/copy more meme at the same time",
              });
            }
          : () => props.setAddModalShow(true)
      }
    >
      +
    </Button>
  );
}

export default AddButton;

import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";
// We want to render this part using portals. First step is to go to index.html, and add a div above the root where we portal the modal and overlay.

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
}

function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}
// Creating a constant for the div we want to portal the modal overlay/backdrops to.
const portalElement = document.getElementById("overlays");
function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}

export default Modal;

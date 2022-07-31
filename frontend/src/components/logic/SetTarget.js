import Modal from "../UI/Modal";

import { useState } from "react";
function SetTarget(props) {
  const [target, setTarget] = useState();

  function targetChangeHandler(event) {
    setTarget(event.target.value);
  }
  function formSubmissionHandler(event) {
    event.preventDefault();
    localStorage.setItem("target", target);
    props.setTarget(target);
    props.onClose();
  }
  return (
    <Modal>
      <form onSubmit={formSubmissionHandler}>
        <label>Set a Calorie Target</label>
        <input type="number" onChange={targetChangeHandler}></input>
        <button>Set Target</button>
      </form>
    </Modal>
  );
}

export default SetTarget;

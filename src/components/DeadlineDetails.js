import { useDeadlinesContext } from "../hooks/useDeadlinesContext";
import { useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthcontext";

import EditDeadlineForm from "./EditDeadlineForm";
const DeadlineDetails = ({ deadline }) => {
  const { dispatch } = useDeadlinesContext();
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);
  if (!user) {
    return (
      <div className="LogOut">
        <h1>You are logged out</h1>
      </div>
    );
  } else {
    const handleClick = async () => {
      const res = await fetch(`/api/deadlines/${deadline._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        console.log("last one");
        dispatch({ type: "DELETE_DEADLINE", payload: data });
      }
    };

    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div className="deadline-preview">
        <h4>{deadline.title}</h4>
        <p>{deadline.deadline}</p>
        <p>{deadline.difficulty}</p>
        <p>{deadline.progress}</p>
        <p>
          <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
            <button
              onClick={handleShow}
              className="btn text-warning btn-act"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE254;</i>
              Edit
            </button>
          </OverlayTrigger>
        </p>
        <span onClick={handleClick}>X</span>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditDeadlineForm deadline={deadline} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close Button
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default DeadlineDetails;

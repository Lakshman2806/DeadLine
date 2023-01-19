import { useDeadlinesContext } from "../hooks/useDeadlinesContext";
import { useState } from "react";
import {
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
  progress,
} from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthcontext";
import Progressbar from "./progressbar";
import EditDeadlineForm from "./EditDeadlineForm";
import { formatDistanceToNow } from "date-fns";

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
        <h6 className="deadlinedate">
          {formatDistanceToNow(new Date(deadline.deadline), {
            addSuffix: true,
          })}
        </h6>
        <h5>Difficulty : {deadline.difficulty}</h5>
        <h5 className="Prog">Progress : {deadline.progress} %</h5>
        <Progressbar progress={deadline.progress} />
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
        {/* <span onClick={handleClick}>Delete</span> */}
        <span>
          <button onClick={handleClick} className="btn text-danger btn-act">
            Delete
          </button>
        </span>
        <div>{deadline.tobedone}</div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Deadline</Modal.Title>
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

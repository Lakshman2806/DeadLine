import { useDeadlinesContext } from "../hooks/useDeadlinesContext";

const DeadlineDetails = ({ deadline }) => {
  const { dispatch } = useDeadlinesContext();
  const handleClick = async () => {
    const res = await fetch(`/api/deadlines/${deadline._id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
      console.log("last one")
      dispatch({type : "DELETE_DEADLINE", payload: data});
    }
  };

  return (
    <div className="deadline-preview">
      <h4>{deadline.title}</h4>
      <p>{deadline.deadline}</p>
      <p>{deadline.difficulty}</p>
      <p>{deadline.progress}</p>
      <span onClick={handleClick}>X</span>
    </div>
  );
};


export default DeadlineDetails;

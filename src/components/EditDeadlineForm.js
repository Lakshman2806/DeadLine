import { useState } from "react";
import { useDeadlinesContext } from "../hooks/useDeadlinesContext";
import { useAuthContext } from "../hooks/useAuthcontext";
const EditDeadlineForm = (editdeadline) => {
  const { dispatch } = useDeadlinesContext();
  const [title, setTitle] = useState(editdeadline.deadline.title);
  const [deadline, setDeadline] = useState(editdeadline.deadline.deadline);
  const [difficulty, setDifficulty] = useState(
    editdeadline.deadline.difficulty
  );
  const [progress, setProgress] = useState(editdeadline.deadline.progress);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  // console.log("editdeadline",editdeadline.deadline)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDeadline = { title, deadline, difficulty, progress };

    const res = await fetch(`/api/deadlines/${editdeadline.deadline._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newDeadline),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setError(null);
      setTitle("");
      setDeadline("");
      setDifficulty("");
      setProgress("");
      console.log("new form submitted");
      console.log("data", data);
      dispatch({ type: "UPDATE_DEADLINE", payload: data });
    }
    console.log("works till now");
  };
  var today = new Date();
  var dd = String(today.getDate() + 1).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  return (
    <form className="NewDeadline" onSubmit={handleSubmit}>
      <label>Deadline Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Date</label>
      <input
        type="date"
        min={today}
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
      />

      <label>difficulty</label>
      <input
        type="number"
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
      />

      <label>progress</label>
      <input
        type="number"
        min="0"
        max="100"
        onChange={(e) => setProgress(e.target.value)}
        value={progress}
        required
      />

      <button>Add Deadline</button>
    </form>
  );
};

export default EditDeadlineForm;

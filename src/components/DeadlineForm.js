import { useState } from "react";
import { useDeadlinesContext } from "../hooks/useDeadlinesContext";
const DeadlineForm = () => {
  const { dispatch } = useDeadlinesContext();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDeadline = { title, deadline, difficulty, progress };

    const res = await fetch("/api/deadlines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      dispatch({ type: "ADD_DEADLINE", payload: data })
    }
  };
  var today = new Date();
  var dd = String(today.getDate()+1).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  return (
    <form className="NewDeadline" onSubmit={handleSubmit}>
      <h3>Add a new Deadline </h3>

      <label>Deadline Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />

      <label>Date</label>
      <input
        type="date"
        min={today}
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
        required
      />

      <label>difficulty</label>
      <input
        type="number"
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
        required
      />

      <label>progress</label>
      <input
        type="number"
        onChange={(e) => setProgress(e.target.value)}
        value={progress}
        required
      />

      <button>Add Deadline</button>
    </form>
  );
};

export default DeadlineForm;

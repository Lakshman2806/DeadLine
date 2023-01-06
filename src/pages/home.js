import { useEffect, useState } from "react";
import { useDeadlinesContext } from "../hooks/useDeadlinesContext";
import { useAuthContext } from "../hooks/useAuthcontext";

// Components
import DeadlineDetails from "../components/DeadlineDetails";
import DeadlineForm from "../components/DeadlineForm";

const Home = () => {
  const { deadlines, dispatch } = useDeadlinesContext();
  const { user } = useAuthContext();

  // const [deadlines, setDeadlines] = useState(null);
  useEffect(() => {
    const fetchDeadlines = async () => {
      const res = await fetch("/api/deadlines", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      // console.log(data);

      if (res.ok) {
        // setDeadlines(data);
        dispatch({ type: "GET_DEADLINES", payload: data });
      } else console.log(data.error);
    };
    if (user) {
      fetchDeadlines();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="deadline-list">
        {deadlines &&
          deadlines.map((deadline) => (
            <DeadlineDetails key={deadline._id} deadline={deadline} />
          ))}
      </div>
      <DeadlineForm />
    </div>
  );
};

export default Home;

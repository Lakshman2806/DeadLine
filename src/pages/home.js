import { useEffect,useState } from "react";
import { useDeadlinesContext } from "../hooks/useDeadlinesContext";
// Components
import DeadlineDetails from "../components/DeadlineDetails";
import DeadlineForm from "../components/DeadlineForm";

const Home = () => {
  const { deadlines, dispatch } = useDeadlinesContext();

  // const [deadlines, setDeadlines] = useState(null);
  useEffect(() => {
    const fetchDeadlines = async () => {
      const res = await fetch('/api/deadlines');
      const data = await res.json();
      // console.log(data);

      if(res.ok)
      {
        // setDeadlines(data);
        dispatch({type: "GET_DEADLINES", payload: data});
      }
      else
        console.log(data.error);
    }

    fetchDeadlines();
  }, [])


  return (
    <div className="home">
      <div className = "deadline-list">
        {deadlines && deadlines.map(deadline => (
          <DeadlineDetails key={deadline._id} deadline={deadline} />
        ))}
        </div>
        <DeadlineForm />
    </div>
  );
};

export default Home;
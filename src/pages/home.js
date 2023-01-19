import { useEffect, useState } from "react";
import { useDeadlinesContext } from "../hooks/useDeadlinesContext";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useLogOut } from "../hooks/useLogOut";
// Components
import DeadlineDetails from "../components/DeadlineDetails";
import DeadlineForm from "../components/DeadlineForm";
import Car from "../components/Calender";
const Home = () => {
  const { deadlines, dispatch } = useDeadlinesContext();
  const { user } = useAuthContext();
  const { logout } = useLogOut();
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
      } else {
        console.log(data.error);
        logout();
      }
    };
    if (user) {
      fetchDeadlines();
    }
  }, [dispatch, user]);
  const order = [];
  if(deadlines){
    deadlines.map((deadline) => {
      var d1 = new Date();
      var d2 = new Date(deadline.deadline);
      var diff = d2.getTime() - d1.getTime();
      var days = Math.ceil(diff / (1000 * 3600 * 24));
      deadline.tobedone = (100-deadline.progress)/days;
      console.log(deadline.tobedone)
      order.push(deadline.deadline);
    });
    deadlines.sort((a, b) => {
      if (a.tobedone > b.tobedone) {
        return -1;
      }
      if (a.tobedone < b.tobedone){
        return 1;
      }
      return -a.difficulty + b.difficulty;
    });
  }
  

  return (
    <div>
      <div className="home">
        <div className="deadline-list">
          {deadlines &&
            deadlines.map((deadline) => (
              <DeadlineDetails key={deadline._id} deadline={deadline} />
            ))}
        </div>
        <DeadlineForm />
      </div>
      <Car />
    </div>
  );
};

export default Home;

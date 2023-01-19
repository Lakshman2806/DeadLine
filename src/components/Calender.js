import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { addDays, differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { useDeadlinesContext } from "../hooks/useDeadlinesContext";

const Car = () => {
  const [date, setDate] = useState(new Date());
  const { deadlines } = useDeadlinesContext();
  const now = new Date();
  const tomorrow = addDays(now, 1);
  const in3Days = addDays(now, 3);
  const in5Days = addDays(now, 5);

  const mark = [];
  if (deadlines) {
    deadlines.map((deadline) => {
      mark.push(new Date(deadline.deadline));
    });
  }
  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }
  function tileClassNameHe({ date, view }) {
    if (view === "month" && mark.find((dDate) => isSameDay(dDate, date))) {
      return "highlight";
    }
  }
  return (
    <div className="Calender">
      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={() => setDate(date)}
        tileClassName={tileClassNameHe}
      />
    </div>
  );
};

export default Car;

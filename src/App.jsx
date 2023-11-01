import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // const [months, setMonths] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]);
  const strMonth = (num) => {
    if (num === 0) {
      return "January";
    }
    if (num === 1) {
      return "February";
    }
    if (num === 2) {
      return "March";
    }
    if (num === 3) {
      return "April";
    }
    if (num === 4) {
      return "May";
    }
    if (num === 5) {
      return "June";
    }
    if (num === 6) {
      return "July";
    }
    if (num === 7) {
      return "August";
    }
    if (num === 8) {
      return "September";
    }
    if (num === 9) {
      return "October";
    }
    if (num === 10) {
      return "November";
    }
    if (num === 11) {
      return "December";
    }
  };

  // const getMonths = () => {
  //   const today = new Date();
  //   const theMonth = today.getMonth();
  //   const oneMonthAgo = today.setMonth(today.getMonth() - 1);

  //   console.log(today);
  //   console.log(theMonth);
  //   console.log(strMonth(theMonth));
  //   console.log(oneMonthAgo);
  // };

  const [days, setDays] = useState();

  const yearDist = () => {
    const days = [];
    const date = new Date();

    // add past year to array
    for (let i = 365; i > 0; i--) {
      const date = new Date();
      const prevDate = new Date(date);
      prevDate.setDate(prevDate.getDate() - i);
      if (prevDate.getDay() == 5 || prevDate.getDay() == 6) {
        days.push(prevDate);
      }
    }

    // add today to array
    if (date.getDate() === 5 || date.getDate() === 6) {
      days.push(date);
    }

    // add future year to array
    for (let i = 1; i < 365; i++) {
      const date = new Date();
      const newerDate = new Date(date);
      newerDate.setDate(newerDate.getDate() + i);
      if (newerDate.getDay() == 5 || newerDate.getDay() == 6) {
        days.push(newerDate);
      }
    }
    setDays((prev) => days);
  };

  useEffect(() => {
    yearDist();
  }, []);

  return (
    <>
      <div>
        <h1>Event Planner</h1>
        <div style={{ display: "flex" }}>
          {days &&
            days.map((day) => {
              return <div style={{ color: "white" }}>{day.toDateString()}</div>;
            })}
        </div>
      </div>
    </>
  );
}

export default App;

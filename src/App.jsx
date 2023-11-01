import { useState } from "react";
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

  const getMonths = () => {
    const today = new Date();
    const theMonth = today.getMonth();
    const oneMonthAgo = today.setMonth(today.getMonth() - 1);

    console.log(today);
    console.log(theMonth);
    console.log(strMonth(theMonth));
    console.log(oneMonthAgo);
  };

  getMonths();
  return (
    <>
      <div>
        <h1>Event Planner</h1>
        {/* <div style={{ display: "flex" }}>
          {months.map((month) => {
            return <div style={{ color: "white" }}>{month}</div>;
          })}
        </div> */}
      </div>
    </>
  );
}

export default App;

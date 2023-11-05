import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";

function App() {
  const date = new Date();

  const [monthValue, setMonthValue] = useState();
  const [yearValue, setYearValue] = useState();

  const handleMonthChange = (event) => {
    setMonthValue(event.target.value);
  };
  const handleYearChange = (event) => {
    setYearValue(event.target.value);
  };

  return (
    <>
      <div>
        <h1>Event Planner</h1>
        <div
          style={{
            display: "flex",
            gap: "3em",
            width: "80%",
            margin: "auto",
            marginBottom: "2em",
            justifyContent: "center",
          }}
        >
          <select
            defaultValue={date.getMonth()}
            onChange={handleMonthChange}
            placeholder="month"
          >
            <option value={0}>January</option>
            <option value={1}>February</option>
            <option value={2}>March</option>
            <option value={3}>April</option>
            <option value={4}>May</option>
            <option value={5}>June</option>
            <option value={6}>July</option>
            <option value={7}>August</option>
            <option value={8}>September</option>
            <option value={9}>October</option>
            <option value={10}>November</option>
            <option value={11}>December</option>
          </select>
          <select
            defaultValue={date.getFullYear()}
            onChange={handleYearChange}
            placeholder="year"
          >
            <option value={date.getFullYear() - 2}>
              {date.getFullYear() - 2}
            </option>
            <option value={date.getFullYear() - 1}>
              {date.getFullYear() - 1}
            </option>
            <option value={date.getFullYear()}>{date.getFullYear()}</option>
            <option value={date.getFullYear() + 1}>
              {date.getFullYear() + 1}
            </option>
            <option value={date.getFullYear() + 2}>
              {date.getFullYear() + 2}
            </option>
          </select>
        </div>
        <Calendar month={monthValue} year={yearValue} />
      </div>
    </>
  );
}

export default App;

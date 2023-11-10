import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";

function App() {
  return (
    <>
      <div
        style={{
          borderRadius: "15px",
          padding: "1em",
        }}
      >
        <h1 className="title">Event Planner</h1>
        <Calendar month={undefined} year={undefined} />
      </div>
    </>
  );
}

export default App;

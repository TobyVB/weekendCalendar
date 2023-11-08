import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";

function App() {
  return (
    <>
      <div>
        <h1 style={{ paddingBottom: "1.5em" }}>Event Planner</h1>

        <Calendar month={undefined} year={undefined} />
      </div>
    </>
  );
}

export default App;

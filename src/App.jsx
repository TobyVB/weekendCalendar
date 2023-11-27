import "./App.css";
import Calendar from "./components/Calendar";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCBJNZyqz24bFkhX70Z2YBBuylgmF_dD-c",
    authDomain: "booking-calendar-8fd29.firebaseapp.com",
    projectId: "booking-calendar-8fd29",
    storageBucket: "booking-calendar-8fd29.appspot.com",
    messagingSenderId: "319323494818",
    appId: "1:319323494818:web:be821bbf1f560f3e3dfafb",
    measurementId: "G-VCKZ35LQMP",
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
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

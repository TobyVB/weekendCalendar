import { useState } from "react";

export default function Calendar(props) {
  const strMonth = (num) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[num];
  };

  const presentDate = new Date();
  const [currentDate, setCurrentDate] = useState(presentDate);
  const [monthValue, setMonthValue] = useState(currentDate.getMonth());
  const [yearValue, setYearValue] = useState(currentDate.getFullYear());

  const scanMonth = (num) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + num);
    setCurrentDate(newDate);
  };
  const selectMonth = (num) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(num.target.value);
    setCurrentDate(newDate);
    setMonthValue(newDate.getMonth());
  };
  const selectYear = (num) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(num.target.value);
    setCurrentDate(newDate);
    setYearValue(newDate.getFullYear());
  };

  const Month = (props) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + props.dif);

    const daysInMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      0
    ).getDate();

    const numFridays = [];
    const numSaturdays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const thisDate = new Date(newDate);
      thisDate.setDate(i);
      if (thisDate.getDay() == 5) {
        numFridays.push(thisDate);
      }
      if (thisDate.getDay() == 6) {
        numSaturdays.push(thisDate);
      }
    }

    const dates = [];
    for (let i = 1; i < daysInMonth + 2; i++) {
      const thisDate = new Date(newDate);
      thisDate.setDate(i);
      if (thisDate.getDay() == 5 || thisDate.getDay() == 6) {
        if (thisDate.getDate() < 7 === true && i + 1 > daysInMonth - 2) {
          break;
        }
        dates.push(thisDate);
      }
    }

    return (
      <>
        {props.dif == 0 && (
          <>
            <div
              style={{
                position: "fixed",
                display: "flex",
                gap: "3em",
                width: "80%",
                margin: "auto",
                marginTop: "-5em",
                justifyContent: "center",
              }}
            >
              <select value={monthValue} onChange={selectMonth}>
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
              <select value={yearValue} onChange={selectYear}>
                <option value={presentDate.getFullYear() - 2}>
                  {presentDate.getFullYear() - 2}
                </option>
                <option value={presentDate.getFullYear() - 1}>
                  {presentDate.getFullYear() - 1}
                </option>
                <option value={presentDate.getFullYear()}>
                  {presentDate.getFullYear()}
                </option>
                <option value={presentDate.getFullYear() + 1}>
                  {presentDate.getFullYear() + 1}
                </option>
                <option value={presentDate.getFullYear() + 2}>
                  {presentDate.getFullYear() + 2}
                </option>
              </select>
            </div>
          </>
        )}
        <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
          <h4 className="year">{newDate.getFullYear()}</h4>
          <h3 className="month">{strMonth(newDate.getMonth())}</h3>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "100%" }}>
              <h4 className="day-title">Fri</h4>
              <div style={{ width: "100%" }}>
                {dates &&
                  dates.map((date, idx) => {
                    if (date.getDay() == 6 && date.getDate() == 1) {
                      return <div className="noDate" key={idx}></div>;
                    }
                    if (date.getDay() == 5) {
                      return (
                        <div className="date" key={idx}>
                          {date.getDate()}
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            <hr style={{ height: "295px" }} />
            <div style={{ width: "100%" }}>
              <h4 className="day-title">Sat</h4>
              <div style={{ width: "100%" }}>
                {dates &&
                  dates.map((date, idx) => {
                    if (date.getDay() == 6) {
                      return (
                        <div className="date" key={idx}>
                          {date.getDate()}
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "300px",
        }}
      >
        {
          <>
            <button className="iterate-month" onClick={() => scanMonth(-1)}>
              prev
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "50vw",
                height: "338px",
                border: "3px solid white",
                backgroundColor: "rgba(255,255,255,.25)",
                margin: "0 2em",
              }}
            >
              <Month dif={-2} />
              <hr className="vertical-rule" />
              <Month dif={-1} />
              <hr className="vertical-rule" />
              <Month dif={0} />
              <hr className="vertical-rule" />
              <Month dif={+1} />
              <hr className="vertical-rule" />
              <Month dif={+2} />
            </div>
            <button className="iterate-month" onClick={() => scanMonth(+1)}>
              next
            </button>
          </>
        }
      </div>
    </>
  );
}

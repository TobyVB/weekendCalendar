import { useState, useEffect } from "react";

export default function Calendar() {
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

  // if no more dates available in the present month,
  // make the current month +1

  const presentDate = new Date();
  const nextMonth = new Date();
  const next2Months = new Date();
  presentDate.setHours(0, 0, 0, 0);
  const startMonthForwardDate = new Date(presentDate);
  startMonthForwardDate.setMonth(presentDate.getMonth() + 1);
  nextMonth.setHours(0, 0, 0, 0);
  next2Months.setHours(0, 0, 0, 0);
  nextMonth.setMonth(presentDate.getMonth() + 1);
  next2Months.setMonth(presentDate.getMonth() + 2);
  const [currentDate, setCurrentDate] = useState(presentDate);
  const [monthValue, setMonthValue] = useState(currentDate.getMonth());
  const [yearValue, setYearValue] = useState(currentDate.getFullYear());
  const [animating, setAnimating] = useState(false);
  const [animatingLong, setAnimatingLong] = useState(false);
  const [animatingReverse, setAnimatingReverse] = useState(false);
  const [startMonthForward, setStartMonthForward] = useState(false);

  const scanMonth = (num, opt) => {
    if (
      currentDate.getMonth() === presentDate.getMonth() &&
      currentDate.getFullYear() === presentDate.getFullYear() &&
      num === -1
    ) {
      return;
    }
    if (
      currentDate.getFullYear() === presentDate.getFullYear() + 3 &&
      currentDate.getMonth() === 11 &&
      num === 1
    ) {
      return;
    }
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + num);
    setCurrentDate(newDate);
    setMonthValue(newDate.getMonth());
    setYearValue(newDate.getFullYear());
    if (num === 1 && opt === undefined) {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
      }, 350);
    } else if (num === -1 && opt === undefined) {
      setAnimatingReverse(true);
      setTimeout(() => {
        setAnimatingReverse(false);
      }, 350);
    } else if (num === 1 && opt) {
      setAnimatingLong(true);
      setTimeout(() => {
        setAnimatingLong(false);
      }, 2000);
    }
  };
  const selectMonth = (num) => {
    // If current year is present year and attempted current
    // month is before he current month, move the year up one
    const newDate = new Date(currentDate);
    newDate.setMonth(num.target.value);
    if (
      currentDate.getFullYear() === presentDate.getFullYear() &&
      num.target.value < presentDate.getMonth()
    ) {
      newDate.setFullYear(newDate.getFullYear() + 1);
      setYearValue((prev) => (prev += 1));
    }
    setCurrentDate(newDate);
    setMonthValue(newDate.getMonth());
  };
  const selectYear = (num) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(num.target.value);
    if (
      currentDate.getMonth() < presentDate.getMonth() &&
      num.target.value == presentDate.getFullYear()
    ) {
      newDate.setFullYear(presentDate.getFullYear() + 1);
      setYearValue(presentDate.getFullYear());
    }
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
    for (let i = 1; i < daysInMonth + 2; i++) {
      const thisDate = new Date(newDate);
      thisDate.setDate(i);
      if (thisDate.getDay() == 5 || thisDate.getDay() == 6) {
        if (thisDate.getDate() < 7 === true && i + 1 > daysInMonth - 2) {
          break;
        }
      }
      if (i == 1 && thisDate.getDay() == 6) {
        numFridays.push("empty");
      }
      if (thisDate.getDay() == 5) {
        numFridays.push(thisDate);
      }
      if (thisDate.getDay() == 6) {
        numSaturdays.push(thisDate);
      }
    }
    console.log(numFridays[numFridays.length - 1]);
    const lastFriday = numFridays[numFridays.length - 1];
    const lastSaturday = numFridays[numSaturdays.length - 1];
    if (
      lastFriday.getDate() < presentDate.getDate() &&
      lastSaturday.getDate() < presentDate.getDate()
    ) {
      console.log("hi");
      if (
        currentDate.toLocaleDateString() == presentDate.toLocaleDateString()
      ) {
        scanMonth(1, true);
        setStartMonthForward(true);
      }
    }
    if (numFridays.length < 5) {
      numFridays.push("empty");
    }
    if (numSaturdays.length < 5) {
      numSaturdays.push("empty");
    }

    const colorAssign = {
      color: "#cdf5fd",
      color2: "#89cff3",
      color3: "",
      color4: "#00a9ff",
      color5: "",
    };

    return (
      <div className={`${props.screen} ${props.hide}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100px",
            border: "10px solid rgba(0,0,0,.0)",
          }}
        >
          <h4 className="year">{newDate.getFullYear()}</h4>
          <h4 className="month">{strMonth(newDate.getMonth())}</h4>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "100%" }}>
              <h4 className="day-title">Fri</h4>
              <div style={{ width: "100%" }}>
                {numFridays &&
                  numFridays.map((date, idx) => {
                    if (date == "empty") {
                      return <div className="noDate" key={idx}></div>;
                    } else {
                      return (
                        <div
                          className={
                            props.data === "visible"
                              ? date >= presentDate
                                ? "date"
                                : "oldDay"
                              : "oldDay"
                          }
                          key={idx}
                        >
                          <h3>{date.getDate()}</h3>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <h4 className="day-title">Sat</h4>
              <div style={{ width: "100%" }}>
                {numSaturdays &&
                  numSaturdays.map((date, idx) => {
                    if (date == "empty") {
                      return <div className="noDate" key={idx}></div>;
                    } else {
                      if (date.getDay() == 6) {
                        return (
                          <div
                            className={
                              props.data === "visible"
                                ? date >= presentDate
                                  ? "date"
                                  : "oldDay"
                                : "oldDay"
                            }
                            key={idx}
                          >
                            <h3>{date.getDate()}</h3>
                          </div>
                        );
                      }
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const selectStyle = {
    // Your styles here
    backgroundColor: "#00a9ff",
    color: "#ffffff",
    // textShadow: "1px 1px 1px black",
    padding: "5px",
    fontSize: "1rem",
    fontWeight: "900",
    border: "1px solid black",
    borderRadius: "5px",
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button
          disabled={
            animatingReverse
              ? true
              : currentDate.toLocaleDateString() ===
                  presentDate.toLocaleDateString() ||
                (startMonthForward &&
                  startMonthForwardDate.toLocaleDateString() ===
                    currentDate.toLocaleDateString())
              ? true
              : false
          }
          className="iterate-month"
          onClick={() => scanMonth(-1)}
        >
          prev
        </button>
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: "3em",
              margin: "1.5em",
              maxWidth: "100%",
              justifyContent: "center",
            }}
          >
            <select
              style={selectStyle}
              value={monthValue}
              onChange={selectMonth}
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
            <select style={selectStyle} value={yearValue} onChange={selectYear}>
              <option value={presentDate.getFullYear()}>
                {presentDate.getFullYear()}
              </option>
              <option value={presentDate.getFullYear() + 1}>
                {presentDate.getFullYear() + 1}
              </option>
              <option value={presentDate.getFullYear() + 2}>
                {presentDate.getFullYear() + 2}
              </option>
              <option value={presentDate.getFullYear() + 3}>
                {presentDate.getFullYear() + 3}
              </option>
            </select>
          </div>
          <div style={{ marginLeft: "-121px" }}>
            <div
              style={{ display: "flex" }}
              className={`${animating && "slideMonth"} ${
                animatingReverse && "slideMonthReverse"
              } ${animatingLong && "slideMonthLong"}`}
            >
              <Month
                data="visible"
                dif={-3}
                screen="medium-screen"
                hide="hide-sm"
              />
              <Month
                data="visible"
                dif={-2}
                screen="small-screen"
                hide="hide-bg"
              />
              {currentDate >= next2Months ? (
                <Month data="visible" dif={-2} screen="medium-screen" />
              ) : (
                <Month data="invisible" dif={-2} screen="medium-screen" />
              )}
              {currentDate >= nextMonth ? (
                <Month data="visible" dif={-1} screen="small-screen" />
              ) : (
                <Month data="invisible" dif={-1} screen="small-screen" />
              )}
              <Month data="visible" dif={0} screen="" />
              <Month data="visible" dif={+1} screen="small-screen" />
              <Month data="visible" dif={+2} screen="medium-screen" />
              <Month
                dif={+2}
                data="visible"
                screen="small-screen"
                hide="hide-bg"
              />
              <Month
                dif={+3}
                data="visible"
                screen="medium-screen"
                hide="hide-sm"
              />
            </div>
          </div>
        </div>

        <button
          disabled={
            animating
              ? true
              : (currentDate.getMonth() === 11 &&
                  currentDate.getFullYear() ===
                    presentDate.getFullYear() + 3) ||
                animatingLong
              ? true
              : false
          }
          className="iterate-month"
          onClick={() => scanMonth(+1)}
        >
          next
        </button>
      </div>
      <div style={{ margin: "2em" }}>
        <button
          disabled={
            animatingReverse
              ? true
              : currentDate.toLocaleDateString() ===
                  presentDate.toLocaleDateString() ||
                (startMonthForward &&
                  startMonthForwardDate.toLocaleDateString() ===
                    currentDate.toLocaleDateString())
              ? true
              : false
          }
          className="iterate-month-sm"
          onClick={() => scanMonth(-1)}
        >
          prev
        </button>
        <button
          disabled={
            animating
              ? true
              : (currentDate.getMonth() === 11 &&
                  currentDate.getFullYear() ===
                    presentDate.getFullYear() + 3) ||
                animatingLong
              ? true
              : false
          }
          className="iterate-month-sm"
          onClick={() => scanMonth(+1)}
        >
          next
        </button>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";

export default function Calendar(props) {
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

  const [currentDif, setCurrentDif] = useState(0);
  const [select, setSelect] = useState(false);
  const [oldMonth, setOldMonth] = useState(false);
  const [oldYear, setOldYear] = useState(false);

  if (props.month !== oldMonth) {
    setOldMonth(props.month);
    setSelect(true);
  }
  if (props.year !== oldYear) {
    setOldYear(props.year);
    setSelect(true);
  }

  useEffect(() => {
    setSelect(false);
  }, [oldMonth]);
  // useEffect(() => {
  //   setSelect((prev) => !prev);
  // }, [oldYear]);

  const Month = (props) => {
    // figure out how to pass the current month and year back into app.jsx
    // and the passed value will be the selected
    const date = new Date();
    const newDate = date;
    if (props.month == undefined) {
      newDate.setMonth(newDate.getMonth() + props.dif + props.curDif);
    } else {
      newDate.setMonth(Number(props.month) + props.dif + props.curDif);
    }
    if (select === true) {
      newDate.setFullYear(Number(props.year));
    }
    // if (props.year !== undefined) {
    //   newDate.setFullYear(Number(props.year));
    // }
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
      <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
        <h4
          style={{
            margin: "0",
            marginTop: "-1.5em",
            textShadow: "1px 1px 2px black",
            fontWeight: "800",
          }}
        >
          {newDate.getFullYear()}
        </h4>
        <h3
          style={{
            border: "1px solid white",
            margin: "0",
            backgroundColor: "rgba(0,0,0,.75)",
          }}
        >
          {strMonth(newDate.getMonth())}
        </h3>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: "100%" }}>
            <h4
              style={{
                color: "white",
                borderBottom: "1px solid white",
                height: "50px",
                margin: "0",
                backgroundColor: "rgba(0,0,0,.65)",
              }}
            >
              Fri
            </h4>
            <div style={{ width: "100%" }}>
              {dates &&
                dates.map((date, idx) => {
                  if (date.getDay() == 6 && date.getDate() == 1) {
                    return (
                      <div
                        style={{
                          color: "white",
                          borderBottom: "1px solid white",
                          height: "50px",
                        }}
                        key={idx}
                      ></div>
                    );
                  }
                  if (date.getDay() == 5) {
                    return (
                      <div
                        style={{
                          color: "white",
                          borderBottom: "1px solid white",
                          height: "50px",
                          backgroundColor: "rgba(0,0,0,.5)",
                        }}
                        key={idx}
                      >
                        {date.getDate()}
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <hr style={{ height: "295px" }} />
          <div style={{ width: "100%" }}>
            <h4
              style={{
                color: "white",
                borderBottom: "1px solid white",
                height: "50px",
                margin: "0",
                backgroundColor: "rgba(0,0,0,.65)",
              }}
            >
              Sat
            </h4>
            <div style={{ width: "100%" }}>
              {dates &&
                dates.map((date, idx) => {
                  if (date.getDay() == 6) {
                    return (
                      <div
                        style={{
                          color: "white",
                          borderBottom: "1px solid white",
                          height: "50px",
                          backgroundColor: "rgba(0,0,0,.5)",
                        }}
                        key={idx}
                      >
                        {date.getDate()}
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
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
            <button
              style={{
                border: "1px solid white",
                alignSelf: "flex-start",
                margin: "auto",
                background: "rgba(0,0,0,.65)",
              }}
              onClick={() => {
                setCurrentDif((prev) => prev - 1);
                setSelect(false);
              }}
            >
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
              <Month
                month={props.month}
                year={props.year}
                dif={-2}
                curDif={currentDif}
              />
              <hr
                style={{
                  height: "327px",
                  borderLeft: "1px solid rgba(255,255,255,1)",
                  borderRight: "1px solid rgba(255,255,255,1)",
                }}
              />
              <Month
                month={props.month}
                year={props.year}
                dif={-1}
                curDif={currentDif}
              />
              <hr
                style={{
                  height: "327px",
                  borderLeft: "1px solid rgba(255,255,255,1)",
                  borderRight: "1px solid rgba(255,255,255,1)",
                }}
              />
              <Month
                month={props.month}
                year={props.year}
                dif={0}
                curDif={currentDif}
              />
              <hr
                style={{
                  height: "327px",
                  borderLeft: "1px solid rgba(255,255,255,1)",
                  borderRight: "1px solid rgba(255,255,255,1)",
                }}
              />
              <Month
                month={props.month}
                year={props.year}
                dif={+1}
                curDif={currentDif}
              />
              <hr
                style={{
                  height: "327px",
                  borderLeft: "1px solid rgba(255,255,255,1)",
                  borderRight: "1px solid rgba(255,255,255,1)",
                }}
              />
              <Month
                month={props.month}
                year={props.year}
                dif={+2}
                curDif={currentDif}
              />
            </div>
            <button
              style={{
                border: "1px solid white",
                alignSelf: "flex-start",
                margin: "auto",
                background: "rgba(0,0,0,.65)",
              }}
              onClick={() => {
                setCurrentDif((prev) => prev + 1);
                setSelect(false);
              }}
            >
              next
            </button>
          </>
        }
      </div>
    </>
  );
}

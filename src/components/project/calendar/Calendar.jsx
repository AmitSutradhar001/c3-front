import dayjs from "dayjs";
import { useState } from "react";
import { generateDate, months } from "./calendar";
import cn from "./cn";
import Left from "/project/arrleft.svg";
import Right from "/project/arrright.svg";
import "../../../css/components/project/calendar/Calendar.css";

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <div className="cn-outer">
      <div className="cn-inner">Calender</div>
      <div className="cn-month">
        <h1 className="cn-month-h1">
          {months[today.month()]}, {today.year()}
        </h1>
        <div className="cn-img-left">
          <img
            src={Left}
            className="cn-img"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          />
          <h2
            className="cn-img-h2"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            Today
          </h2>
          <img
            src={Right}
            className="cn-img"
            onClick={() => {
              setToday(today.month(today.month() + 1));
            }}
          />
        </div>
      </div>
      <div className="cn-f-div">
        {days.map((day, index) => {
          return (
            <h1 key={index} className="cn-f-div-h1">
              {day}
            </h1>
          );
        })}
      </div>
      <div className="cn-s-div">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <div key={index} className="cn-s-inner-div">
                <h1
                  className={cn(
                    currentMonth ? "" : "cn-s-inner-div-h1-currentmonth",
                    today ? "cn-s-inner-div-h1-today" : "",
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "cn-s-inner-div-h1-date"
                      : "",
                    "cn-s-inner-div-h1"
                  )}
                  onClick={() => {
                    setSelectDate(date);
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

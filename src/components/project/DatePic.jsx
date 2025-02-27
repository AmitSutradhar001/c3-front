import "../../css/components/issue/Input.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "../../css/components/project/DatePic.css";
const DatePic = ({ name, defaultValue = null }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="in-outer">
        <DatePicker
          dateFormatCalendar="LLLL yyyy"
          id={name}
          name={name}
          selected={defaultValue || startDate}
          onChange={(date) => setStartDate(date)}
          className="date-pic"
        />
        <label htmlFor={name} className="in-label">
          {name}
        </label>
      </div>
    </>
  );
};

export default DatePic;

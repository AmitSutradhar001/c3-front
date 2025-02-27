import { useState } from "react";
import "../../css/components/project/Companies.css";

const Companies = ({ text }) => {
  const [companies, setCompanies] = useState([
    "sdfghjk",
    "edfg",
    "jhg",
    "vdtfhh",
    "rvgtbnh",
  ]);
  return (
    <>
      <div className="cp-outer">
        <h2 className="cp-h2">{text}</h2>
        <div className="cp-inner">
          <img src="/project/search-normal.svg" />
          <input
            type="text"
            placeholder="Enter company name"
            className="cp-inner-input"
          />
        </div>
        <div className="cp-s-last">
          {companies.map((item) => (
            <div key={item} className="cp-last-div">
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Companies;

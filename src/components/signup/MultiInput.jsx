import { useState, useEffect, useRef } from "react";
import { university } from "../../data/dummy.js";
import "../../css/components/signup/MultiInput.css";
const MultiInput = ({ type, name, placeHolder = "", svg }) => {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const handleClick = () => {
    setShow((pre) => !pre);
  };
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShow(false);
    }
  };
  const handleItemClick = (item) => {
    setInputValue(item);
    setShow(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="mult-outer" ref={wrapperRef}>
        <label htmlFor={name} className="mult-label">
          {name}
        </label>
        <div className="mult-div">
          <input
            onClick={handleClick}
            type={type}
            id={name}
            name={name}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeHolder}
            className="mult-in"
          />
          {svg && <img src={svg} alt="" />}
          {show && (
            <ul className="mult-ul ">
              {university.map((item) => (
                <li
                  key={item}
                  className="mult-li"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default MultiInput;

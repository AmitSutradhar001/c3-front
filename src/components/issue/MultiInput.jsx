import { useState, useEffect, useRef } from "react";
import { tags } from "../../data/dummy.js";
import "../../css/components/issue/MultiInput.css";

const MultiInput = ({
  type,
  name,
  placeHolder = "",
  svg = "",
  defaultValue = [],
}) => {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState(defaultValue);

  const wrapperRef = useRef(null);
  const [tag, setTag] = useState("");
  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  const handleItemClick = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems((prevItems) => [...prevItems, item]);
    }
    setShow(false); // Close dropdown after selecting item
  };

  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item !== itemToRemove)
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="iss-m-outer" ref={wrapperRef}>
        <div
          className="iss-m-inn"
          value={selectedItems}
          type={type}
          name="arrTags"
        >
          {selectedItems.map((item) => (
            <div key={item} className="iss-m-s-div">
              {item}
              <span
                className="iss-m-s-span"
                onClick={() => handleRemoveItem(item)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
        <div className="iss-in-div">
          <input
            type={type}
            id={name}
            onChange={(e) => setTag(e.target.value)}
            onClick={handleClick}
            value={selectedItems.join(", ")} // Display selected tags as comma-separated string
            name={name}
            placeholder={placeHolder}
            className="iss-in-in"
          />
          {svg && <img src={svg} alt="" />}
        </div>
        <label htmlFor={name} className="iss-in-label">
          {name}
        </label>
        {show && (
          <ul className="iss-in-ul">
            {tags.map((item) => (
              <li
                key={item}
                className={`iss-in-li ${
                  selectedItems.includes(item) ? "iss-in-if" : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MultiInput;

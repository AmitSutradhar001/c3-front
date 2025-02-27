import { useState, useEffect, useRef } from "react";
import { tags } from "../../data/dummy.js";
import "../../css/components/profile/MultiInput.css";

const MultiInput = ({ type, name, placeHolder = "", svg }) => {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
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
    setShow(false);
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
      <div className="p-mult-outer" ref={wrapperRef}>
        <label htmlFor={name} className="p-mult-label">
          {name}
        </label>
        <div
          className="p-arr-div"
          value={selectedItems}
          type={type}
          name="arrTags"
        >
          {selectedItems.map((item) => (
            <div key={item} className="p-item-div">
              {item}
              <span
                className="p-item-span"
                onClick={() => handleRemoveItem(item)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
        <div className="p-mult-div">
          <input
            type={type}
            id={name}
            onChange={(e) => setTag(e.target.value)}
            onClick={handleClick}
            value={selectedItems.join(", ")} // Display selected tags as comma-separated string
            name={name}
            placeholder={placeHolder}
            className="p-mult-in"
          />
          {svg && <img src={svg} alt="" />}
          {show && (
            <ul className="p-mult-ul">
              {tags.map((item) => (
                <li
                  key={item}
                  className={`p-li ${
                    selectedItems.includes(item) ? "p-li-active" : ""
                  }`}
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

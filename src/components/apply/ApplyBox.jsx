import { useState } from "react";
import Button from "./Button";
import { useApi } from "../../context/ApiContext";
import "../../css/components/apply/ApplyBox.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ApplyBox = ({ toggleApplyBox, issue }) => {
  const api = useApi();
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [textAreaValue, setTextAreaValue] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();

    if (textAreaValue === "") return toast.warn("Make a proposal!");
    try {
      const res = await api.post(
        "/application/create-application",
        {
          issueId: issue._id,
          projectId: id,
          content: textAreaValue,
        },
        {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        toggleApplyBox();
        return toast.success("Application is created!");
      }
    } catch (error) {
      toggleApplyBox();
      return toast.error(error.message || "Internal error!");
    }
  };

  const handleOff = () => {
    toggleApplyBox();
  };

  const handleChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  return (
    <div className="apb-overlay">
      <div className="apb-outer-div">
        <div className="apb-inner-div">Apply for Issue</div>
        <form className="apb-form">
          <p className="apb-p">Enter your proposal Idea ?</p>
          <textarea
            value={textAreaValue}
            onChange={handleChange}
            name="issuetext"
            className="apb-textarea"
          />
        </form>
        <div className="apb-last">
          <button className="apb-last-btn" onClick={handleOff} type="">
            Cancle
          </button>
          <Button text={"Submit"} func={handleClick} type={"submit"} />
        </div>
      </div>
    </div>
  );
};

export default ApplyBox;

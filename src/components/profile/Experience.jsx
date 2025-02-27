import { useState } from "react";
import DatePicker from "react-datepicker";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateContributor } from "../../redux/contributorSlice";
import "../../css/components/profile/Experience.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import { useApi } from "../../context/ApiContext";
import { login } from "../../redux/userSlice.js";

const Experience = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comName = formData.get("company_name");
    const comLocation = formData.get("location");
    const comPosition = formData.get("position");
    const comDescription = formData.get("description");
    if (
      !comName ||
      !comLocation ||
      !comPosition ||
      !comDescription ||
      !startDate ||
      !endDate
    ) {
      return toast.warn("Fill the form first!");
    }
    // const start_date = startDate.toISOString().slice(0, 10);
    // const end_date = endDate.toISOString().slice(0, 10);
    try {
      const loginResponse = await api.put(
        "/user/update-user",
        {
          comName,
          comLocation,
          comPosition,
          comDescription,
          comStart: startDate,
          comEnd: endDate,
        },
        {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true, // Required to send and receive cookies
        }
      );
      console.log(loginResponse.data.user);
      if (loginResponse.status === 200) {
        dispatch(login(loginResponse.data.user));

        toast.success("Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/profile/education");
        }, 1000);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="ep-outer">
      <ToastContainer style={{ top: "100px" }} />
      <Sidebar />
      <div className="ep-inn-1">
        <div className="ep-inn-2">
          <div className="ep-inn-3">
            <h2 className="ep-inn-3-h2">Work Experience</h2>
          </div>

          <div className="ep-inn-4">
            <form onSubmit={handleSubmit} className="ep-f">
              <div className="ep-f-1">
                <label className="ep-f-1-label" htmlFor="company_name">
                  Name of Company
                </label>
                <div className="ep-f-div-1">
                  <input
                    name="company_name"
                    id="company_name"
                    placeholder="Collab"
                    className="exp-f-in "
                  />
                </div>
              </div>
              <div className="ep-f-2">
                <label className="ep-f-2-label" htmlFor="location">
                  Location
                </label>
                <div className="ep-f-div-1">
                  <input
                    name="location"
                    id="location"
                    placeholder="Location"
                    className="exp-f-in"
                  />
                </div>
              </div>

              <div className="ep-f-2">
                <label className="ep-f-2-label" htmlFor="position">
                  Position
                </label>
                <div className="ep-f-div-1">
                  <input
                    name="position"
                    id="position"
                    placeholder="UI/UX Disigner"
                    className="exp-f-in"
                  />
                </div>
              </div>
              <div className="ep-f-d-1">
                <div className="ep-f-d-inn">
                  <label className="ep-f-2-label" htmlFor="designation">
                    Start Date
                  </label>
                  <div className="ep-f-d-in-1">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="ep-date"
                    />
                    <img src="/profile/p-date.svg" className="ep-img" />
                  </div>
                </div>
                <div className="ep-e-div">
                  <label className="ep-f-2-label" htmlFor="designation">
                    End Date
                  </label>
                  <div className="ep-f-d-in-1">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="ep-date-end"
                    />
                    <img src="/profile/p-date.svg" className="ep-img" />
                  </div>
                </div>
              </div>

              <div className="ep-des-div-3">
                <label className="ep-f-1-label" htmlFor="description">
                  Description
                </label>
                <div className="ep-f-div-1">
                  <input
                    name="description"
                    id="description "
                    placeholder="Description"
                    className="exp-f-in"
                  />
                </div>
              </div>
              <div className="ep-last-div">
                <button type="submit" className="ep-up-btn">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;

import { useState } from "react";
import Sidebar from "./Sidebar";
import DatePicker from "react-datepicker";
import "../../css/components/profile/Personal.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateContributor } from "../../redux/contributorSlice";
import { toast, ToastContainer } from "react-toastify";
import { useApi } from "../../context/ApiContext";
import { login } from "../../redux/userSlice.js";

const Education = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const contributor = useSelector((state) => {
    const { _persist, ...contributorData } = state.contributor;
    return contributorData;
  });
  console.log(contributor);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const institute = formData.get("institute");
    const location = formData.get("location");
    const degree = formData.get("degree");
    const description = formData.get("description");
    if (
      !institute ||
      !location ||
      !degree ||
      !description ||
      !startDate ||
      !endDate
    ) {
      return toast.warn("Fill the form first!", {
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
    const start_date = startDate.toISOString().slice(0, 10);
    const end_date = endDate.toISOString().slice(0, 10);
    dispatch(
      updateContributor({
        educations: [
          {
            degree,
            institute,
            location,
            description,
            start_date,
            end_date,
          },
        ],
      })
    );
    try {
      const loginResponse = await api.put(
        "/user/update-user",
        {
          instLocation: location,
          instName: institute,
          instDegreeName: degree,
          instStart: start_date,
          instEnd: end_date,
          instDescription: description,
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
    } finally {
      setTimeout(() => navigate("/"), 3000);
    }
  };

  return (
    <div className="ps-outer">
      <Sidebar />
      <div className=" ps-inn">
        <ToastContainer style={{ top: "100px" }} />
        <div className="ps-inn-1">
          <div className="ps-inn-2">
            <h2 className="ps-inn-2-h2">Educations</h2>
          </div>
          <div className="ps-inn-3">
            <form onSubmit={handleSubmit} className="ps-f">
              <div className="ps-f-out">
                <label className="ps-f-label" htmlFor="institute">
                  Name of Institute
                </label>
                <div className="ps-f-in-div">
                  <input
                    name="institute"
                    id="institute"
                    placeholder="IIT Delhi"
                    className="ps-f-in"
                  />
                </div>
              </div>
              <div className="ps-f-out">
                <label className="ps-f-label" htmlFor="degree">
                  Name of Degree
                </label>
                <div className="ps-f-in-div">
                  <input
                    name="degree"
                    id="degree"
                    placeholder="BCA/MCA"
                    className="ps-f-in"
                  />
                </div>
              </div>
              <div className="ps-f-out">
                <label className="ps-f-label" htmlFor="location">
                  Location
                </label>
                <div className="ps-f-in-div">
                  <input
                    name="location"
                    id="location"
                    placeholder="Delhi"
                    className="ps-f-in"
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
              <div className="ps-f-div-2">
                <label className="ps-f-label" htmlFor="description">
                  Description
                </label>
                <div className="ps-f-in-div">
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Describe your Project ..."
                    className="ps-text"
                  />
                </div>
              </div>

              <div className="ps-c-btn">
                <button type="submit" className="ps-up">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Education;

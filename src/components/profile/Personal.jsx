import Sidebar from "../profile/Sidebar";
import "../../css/components/profile/Personal.css";
import { useNavigate } from "react-router-dom";
import MultiInput from "./MultiInput";
import downArrow from "/downArrow.svg";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { useApi } from "../../context/ApiContext";
import { login } from "../../redux/userSlice.js";

const Personal = () => {
  const { user } = useSelector((state) => state.user);
  const [imageFileUrl, setImageFileUrl] = useState(user?.profilePicture || "");
  const filePick = useRef();
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cld = new Cloudinary({ cloud: { cloudName: "dzely4n74" } });
  useEffect(() => {
    if (user?.profileimage) {
      setImageFileUrl(user.profileimage);
    }
  }, [user]); // Update when user changes

  // Use this sample image or upload your own via the Media Explorer

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullname = formData.get("fullName");
    const phNo = formData.get("phone");
    const role = formData.get("role");
    const stack = formData.get("Stack");
    const bio = formData.get("bio");

    if (!fullname || !phNo || !bio || !role || !stack) {
      return toast.warn("Fill the form first!");
    }

    try {
      const loginResponse = await api.put(
        "/user/update-user",
        { fullname, phNo, bio, role, stack, profilePicture: imageFileUrl },
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
          navigate("/profile/experience");
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
  // Store image URL in localStorage and update the state
  const handleImgChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "collab"); // Replace with your Cloudinary upload preset
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzely4n74/image/upload`,
        formData
      );
      setImageFileUrl(response.data.secure_url);
      console.log("Uploaded Image URL:", response.data.secure_url);
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  const handleClick = () => {
    filePick.current.click(); // Trigger the file input when the div is clicked
  };

  return (
    <div className="ps-outer">
      <ToastContainer style={{ top: "100px" }} />
      <Sidebar />
      <div className=" ps-inn">
        <div className="ps-inn-1">
          <div className="ps-inn-2">
            <h2 className="ps-inn-2-h2">Personal Details</h2>
          </div>
          <div className="ps-inn-3">
            <div className="ps-inn-3-outer">
              <div className="ps-inn-3-in" onClick={handleClick}>
                <input
                  type="file"
                  ref={filePick}
                  accept="image/*"
                  onChange={handleImgChange}
                  className="hidden"
                />
                <img
                  src={imageFileUrl || "default-image-url"} // Use a placeholder if no image
                  className="w-16 h-16 rounded-full cursor-pointer"
                  alt="Profile"
                />
              </div>

              <div className="ps-inn-3-in-2">
                <h2 className="ps-inn-3-h2">Profile Picture</h2>
                <h3 className="ps-inn-3-h3">PNG, JPG max size of 3MB</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="ps-f">
              <div className="ps-f-out">
                <label className="ps-f-label" htmlFor="fullName">
                  Full Name
                </label>
                <div className="ps-f-in-div">
                  <input
                    name="fullName"
                    id="fullName"
                    placeholder="Amit Sutradhar"
                    className="ps-f-in"
                  />
                </div>
              </div>
              <div className="ps-f-div-2">
                <label className="ps-f-label" htmlFor="role">
                  Role
                </label>
                <div className="ps-f-in-div">
                  <input
                    name="role"
                    id="role"
                    placeholder="Web Developer"
                    className="ps-f-in"
                  />
                </div>
              </div>
              <MultiInput
                name={"Stack"}
                placeHolder={"UI Design, UX Design"}
                type={"text"}
                svg={downArrow}
              />
              <div className="ps-f-div-2">
                <label className="ps-f-label" htmlFor="phone">
                  Phone no.
                </label>
                <div className="ps-f-in-div">
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="9827XXXXXX"
                    className="ps-f-in"
                  />
                </div>
              </div>
              <div className="ps-f-div-2">
                <label className="ps-f-label" htmlFor="bio">
                  Bio
                </label>
                <div className="ps-f-in-div">
                  <textarea
                    name="bio"
                    id="bio"
                    placeholder="Amet sed a egestas consectetur egestas dignissim amet imperdiet at. Pulvinar ullamcorper lobortis aliquam tristique enim. Vel malesuada nisl feugiat pellentesque quam accumsan tortor ac."
                    className="ps-text"
                  />
                </div>
              </div>
              <div className="ps-c-btn">
                <button type="submit" className="ps-up">
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

export default Personal;

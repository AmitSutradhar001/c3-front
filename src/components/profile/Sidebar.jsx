import { useEffect, useState } from "react";
import { personalDetails } from "../../data/dummy.js";
import Mi from "/profile/minus.svg";
import Pl from "/profile/pl.svg";
import { NavLink } from "react-router-dom";
import "../../css/components/profile/Sidebar.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const { user } = useSelector((state) => state.user);

  const [profile, setProfile] = useState(null);
  // State to manage the visibility of the personal details
  const [showPersonalDetails, setPersonalShowDetails] = useState(false);
  const [showPersonalProjects, setPersonalShowProjects] = useState(false);
  const [showPersonalExperience, setPersonalShowExperience] = useState(false);
  const [showPersonalSkills, setPersonalShowSkills] = useState(false);
  const [showPersonalPortfolio, setPersonalShowPortfolio] = useState(false);

  useEffect(() => {
    const contributors = JSON.parse(localStorage.getItem("contributors")) || [];
    console.log(contributors);
    const filteredContributors = contributors.filter(
      (contributor) => contributor.userId == user.user_id
    );
    setProfile(filteredContributors[0]);

    // Find the specific image for the current user
    let images = JSON.parse(localStorage.getItem("profileImages")) || [];
    const userProfile = images?.find((image) => image.id === user.user_id);
    console.log(userProfile);

    // If found, set the image URL; otherwise, set a placeholder
    if (userProfile) {
      setImageFileUrl(userProfile.image);
    } else {
      setImageFileUrl(""); // Placeholder image if not found
    }
  }, [user]); // Dependency array

  // Toggle functions to show/hide the personal details
  const toggleDetails = () => {
    setPersonalShowDetails(!showPersonalDetails);
  };
  const toggleProjects = () => {
    setPersonalShowProjects(!showPersonalProjects);
  };
  const toggleExperience = () => {
    setPersonalShowExperience(!showPersonalExperience);
  };
  const toggleSkills = () => {
    setPersonalShowSkills(!showPersonalSkills);
  };
  const togglePortfolio = () => {
    setPersonalShowPortfolio(!showPersonalPortfolio);
  };

  return (
    <div className="psd-out">
      {/* Profile logo and name div */}
      <div className="psd-in">
        <img src={user.profilePicture} className="psd-in-img" alt="Profile" />

        <div className="psd-in-3">
          <h2 className="psd-h2">{user ? user.fullname : "Vedant Tiwari"}</h2>
          <div className="psd-in-4">
            <h3 className="psd-h3">{user ? user._id : "ved_ant2375"}</h3>
            <img src="/profile/PolygonProfile.svg" alt="polygon" />
          </div>
          <div className="psd-in-5">
            <h2 className="psd-in-5-h2">Rank</h2>
            <h3 className="psd-in-5-h3">4,35,167</h3>
          </div>
        </div>
      </div>
      {/* Description and buttons */}
      <div className="psd-des">
        <h2 className="psd-des-t">I am an Android Developer and coder</h2>
        <div className="psd-ul">
          <div className="psd-ul-in">
            <NavLink to={"/profile/details"} className="psd-ul-link">
              <span>Edit Profile</span>
            </NavLink>
            <div className="psd-ul-pro-out">
              <div className="psd-ul-pro"></div>
            </div>
          </div>
          <button className="psd-pro-add">Add to Group</button>
        </div>
      </div>
      {/* Profile lists */}
      <div className="psd-p-out">
        <div onClick={toggleDetails} className="psd-p-in">
          <div className="psd-p-in-1">Personal Details</div>
          <button>
            <img src={showPersonalDetails ? Mi : Pl} alt="toggle icon" />
          </button>
        </div>
        {showPersonalDetails && (
          <>
            <ul className="psd-p-in-ul">
              <li className="psd-p-in-li">Full Name</li>
              <li className="psd-p-in-li">{user ? user.fullname : ""}</li>
            </ul>
            <ul className="psd-p-in-ul">
              <li className="psd-p-in-li">Role</li>
              <li className="psd-p-in-li">{user ? user.role : ""} </li>
            </ul>
            <ul className="psd-p-in-ul">
              <li className="psd-p-in-li">Phone no.</li>
              <li className="psd-p-in-li">{user ? user.phNo : ""}</li>
            </ul>
          </>
        )}
      </div>
      {/*  Education */}
      <div className="psd-p-out">
        <div onClick={toggleProjects} className="psd-p-in">
          <div className="psd-p-in-1">Education</div>
          <button>
            <img src={showPersonalProjects ? Mi : Pl} alt="toggle icon" />
          </button>
        </div>
        {showPersonalProjects && (
          <>
            <ul className="psd-p-in-ul">
              <li className="psd-p-in-li">Institute</li>
              <li className="psd-p-in-li">{user ? user?.instName : ""}</li>
            </ul>
            <ul className="psd-p-in-ul">
              <li className="psd-p-in-li">Degree</li>
              <li className="psd-p-in-li">
                {user ? user?.instDegreeName : ""}
              </li>
            </ul>
            <ul className="psd-p-in-ul">
              <li className="psd-p-in-li">Location</li>
              <li className="psd-p-in-li">{user ? user?.instLocation : ""}</li>
            </ul>
          </>
        )}
      </div>
      {/* Work Experience */}
      <div className="psd-p-out">
        <div onClick={toggleExperience} className="psd-p-in">
          <div className="psd-p-in-1">Work Experience</div>
          <button>
            <img src={showPersonalExperience ? Mi : Pl} alt="toggle icon" />
          </button>
        </div>
        {showPersonalExperience && (
          <>
            <ul className="psd-p-in-ul">
              <li className="psd-p-in-li">Company</li>
              <li className="psd-p-in-li">{user ? user.comName : ""}</li>
            </ul>
            <ul className="psd-p-in-ul">
              <li className="psd-p-in-li">Location</li>
              <li className="psd-p-in-li">{user ? user?.comLocation : ""}</li>
            </ul>
            <ul className="psd-p-in-ul">
              <li className="psd-p-in-li">Position</li>
              <li className="psd-p-in-li">{user ? user.comPosition : ""}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

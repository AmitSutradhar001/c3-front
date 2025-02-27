import { NavLink } from "react-router-dom";
import collab from "/collabLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { userLogout } from "../redux/userSlice.js";
import { resetGitAndCollabProject } from "../redux/gitAndCollabProject.js";
import { resetContributor } from "../redux/contributorSlice.js";
import { resetProjects } from "../redux/projectsSlice.js";
import "../css/components/Navbar.css";

const Navbar = () => {
  const {user} = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetGitAndCollabProject());
    dispatch(resetContributor());
    dispatch(resetProjects());
    // localStorage.removeItem("profileImage");

    setTimeout(() => dispatch(userLogout()), 1000);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="nv-outer">
        <div className="nv-inner">
          <NavLink to={"/"} className="nv-home-link">
            <img src={collab} alt="collab logo" />
            <h2 className="nv-home-h2">Collab</h2>
          </NavLink>
          <div className="nv-ex-div">
            <NavLink
              to={"/explore"}
              className={({ isActive }) =>
                isActive ? "nv-active" : "nv-inactive"
              }
            >
              Explore
            </NavLink>
            <NavLink
              to={
                user
                  ? user.isAdmin
                    ? "/projects/admin"
                    : "/projects/contributor"
                  : ""
              }
              className={({ isActive }) =>
                isActive ? "nv-active" : "nv-inactive"
              }
            >
              Projects
            </NavLink>
            <NavLink
              to={"/clan-list"}
              className={({ isActive }) =>
                isActive ? "nv-active" : "nv-inactive"
              }
            >
              Clans
            </NavLink>
            {user?.clanId && (
              <>
                <NavLink
                  to={`/clan/${user.clanId}`}
                  className={({ isActive }) =>
                    isActive ? "nv-active" : "nv-inactive"
                  }
                >
                  My Clan
                </NavLink>
              </>
            )}
            {user?.isAdmin && (
              <>
                <NavLink
                  to={`/contest_page`}
                  className={({ isActive }) =>
                    isActive ? "nv-active" : "nv-inactive"
                  }
                >
                  Contest
                </NavLink>
              </>
            )}
            {user ? (
              <div className="relative">
                <img
                  onClick={toggleMenu}
                  className="h-16 w-16 p-2 rounded-full focus:border-2 forced:border-emerald-700 "
                  src={user.profilePicture}
                />

                {isMenuOpen && (
                  <div className="nv-pv-outer">
                    <NavLink
                      to="/profile"
                      className="nv-pv-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View Profile
                    </NavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="nv-pv-btn"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive ? "nv-active" : "nv-inactive"
                  }
                >
                  Login
                </NavLink>
                <NavLink to={"/signup"} className="nv-signup">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

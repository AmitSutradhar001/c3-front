import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import collab from "/collabLogo.png";
import { useState } from "react";
import { userLogout } from "../redux/userSlice.js";
import { resetGitAndCollabProject } from "../redux/gitAndCollabProject.js";
import { resetContributor } from "../redux/contributorSlice.js";
import { resetProjects } from "../redux/projectsSlice.js";
import "../css/components/NavbarMobile.css";

const NavbarMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    // localStorage.removeItem("profileImage");

    dispatch(resetContributor());
    dispatch(resetGitAndCollabProject());

    dispatch(resetProjects());
    setTimeout(() => dispatch(userLogout()), 1000);
  };
  const toggleProfileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nm-outer">
      <div className="nm-inner">
        <NavLink to={"/"} className="nm-home">
          <img src={collab} alt="collab logo" />
          <h2 className="nm-h2">Collab</h2>
        </NavLink>

        {/* Hamburger Icon */}
        <button className="nm-icon" onClick={toggleMenu}>
          <svg
            className="nm-svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menu items */}
      <div className={menuOpen ? "nm-menu-on" : "nm-menu-off"}>
        <NavLink
          onClick={toggleProfileMenu}
          to={user ? "#" : "/login"}
          className="nm-link"
        >
          {user ? "Profile" : "Login"}
        </NavLink>
        {user && isMenuOpen && (
          <div className="nm-pv-outer">
            <NavLink
              to="/profile"
              className="nm-pv-link"
              onClick={() => setIsMenuOpen(false)}
            >
              View Profile
            </NavLink>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="nm-pv-btn"
            >
              Logout
            </button>
          </div>
        )}
        {!user && (
          <NavLink onClick={toggleMenu} to={"/signup"} className="nm-link">
            Sign Up
          </NavLink>
        )}
        <NavLink onClick={toggleMenu} to={"/explore"} className="nm-link">
          Explore
        </NavLink>
        <NavLink
          onClick={toggleMenu}
          to={
            user
              ? user.isAdmin
                ? "/projects/admin"
                : "/projects/contributor"
              : ""
          }
          className="nm-link"
        >
          Projects
        </NavLink>
        <NavLink onClick={toggleMenu} to={"/clan-list"} className="nm-link">
          Clans
        </NavLink>
        {user?.clanId && (
          <>
            <NavLink to={`/clan/${user.clanId}`} className="nm-link">
              My Clan
            </NavLink>
          </>
        )}
        {user?.isAdmin && (
          <>
            <NavLink to={`/contest_page`} className="nm-link">
              Contest
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarMobile;

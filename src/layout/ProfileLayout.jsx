import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
// import Sidebar from "../components/profile/Sidebar";
export const ProfileLayout = () => {
  return (
    <>
      <div className="min-w-full h-screen">
        <Navbar />
        <NavbarMobile />

        <Outlet />
      </div>
    </>
  );
};

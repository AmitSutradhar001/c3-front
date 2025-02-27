import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";

export const RootLayout = () => {
  return (
    <>
      <div className="z-50">
        <Navbar />
        <NavbarMobile />
      </div>

      <Outlet />
    </>
  );
};

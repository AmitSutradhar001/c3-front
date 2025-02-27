import Button from "../components/signup/Button";
import CheckBox from "../components/signup/CheckBox";
import Input from "../components/signup/Input";
import { OAuthBtn } from "../components/signup/OAuthBtn";
import Google from "/signup/google.svg";
import Microsoft from "/signup/microsoft.svg";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import { useApi } from "../context/ApiContext";
import { useState } from "react";
import "../css/pages/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const fullName = formData.get("Full Name");
    const email = formData.get("Email");
    const password = formData.get("Password");
    const condirmPassword = formData.get("Confirm Password");
    let isAdmin = formData.get("Is Admin?");
    if (!fullName || !email || !password || !condirmPassword) {
      return toast.warn("Fill the form!", {
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

    if (password !== condirmPassword) {
      return toast.info("Password dosn't match with the confirm password!", {
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
    if (isAdmin === "on") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
    let schema = {
      email: email,
      fullname: fullName,
      password: password,
      is_admin: isAdmin,
    };
    try {
      setLoading(true);
      const signupResponse = await api.post("/auth/register", schema, {
        headers: {
          "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
        },
      });
      console.log(signupResponse);

      if (signupResponse.status == 201) {
        toast.success("Signup Successfully!", {
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
          navigate("/login");
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
      setLoading(false);
    }
  };
  return (
    <>
      <img
        src="/signup/Supertract.svg"
        alt="Upper SVG"
        className="sig-upper-svg"
      />
      <Navbar />
      <NavbarMobile />
      <div className="sig-outer">
        <ToastContainer style={{ top: "100px" }} />
        <div className="sig-inner">
          <img src="./collabLogo.png" alt="collab logo" />
          <h1 className="sig-h1">Create Account</h1>
          <form className="sig-form" onSubmit={handleSubmit}>
            <Input
              name={"Full Name"}
              placeHolder={"Enter Your name"}
              type={"text"}
            />
            <Input
              name={"Email"}
              placeHolder={"Someone@gmail.com"}
              type={"email"}
            />
            <Input
              name={"Password"}
              placeHolder={"*******"}
              type={"password"}
            />
            <Input
              name={"Confirm Password"}
              placeHolder={"*******"}
              type={"password"}
            />
            <div className="sig-check">
              <CheckBox type={"checkbox"} name={"Is Admin?"} />
            </div>

            <Button text={"Sign Up"} type={"submit"} loading={loading} />
          </form>
          <div className="sig-check-div-new">
            <CheckBox type={"checkbox"} name={"Remember Me"} />
          </div>
          <div className="sig-m-div">
            <div className="sig-row-div"></div>
            <p className="sig-row-p">Or</p>
            <div className="sig-row-div"></div>
          </div>
          <OAuthBtn
            isDisable={false}
            svg={Google}
            text={"Sign Up with Google"}
            alt={"Google"}
          />
          <OAuthBtn
            isDisable={true}
            svg={Microsoft}
            text={"Sign Up with Microsoft"}
            alt={"microsoft"}
          />
          <div className="sig-last">
            Already have an account ?
            <span className="sig-span">
              <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </div>
      </div>
      <img
        src="/signup/Subtract.svg"
        alt="Upper SVG"
        className="sig-down-svg"
      />
    </>
  );
};

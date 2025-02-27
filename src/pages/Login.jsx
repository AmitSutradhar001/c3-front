import Button from "../components/signup/Button";
import CheckBox from "../components/signup/CheckBox";
import Input from "../components/signup/Input";
import Google from "/signup/google.svg";
import Microsoft from "/signup/microsoft.svg";
import "../css/pages/Login.css";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import { useApi } from "../context/ApiContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice.js";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const email = formData.get("Email");
    const password = formData.get("Password");
    if (!email || !password) {
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
    try {
      setLoading(true);
      const loginResponse = await api.post(
        "/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true, // Required to send and receive cookies
        }
      );
      if (loginResponse.status === 200) {
        let newData = jwtDecode(loginResponse.data.collab_token);
        dispatch(login(newData.user));

        toast.success("Loged In Successfully!", {
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
          navigate("/profile/details");
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
        className="log-upper-svg"
      />
      <Navbar />
      <NavbarMobile />

      <div className="log-outer">
        <ToastContainer style={{ top: "100px" }} />

        <div className="log-inner">
          <img src="./collabLogo.png" alt="collab logo" />
          <h1 className="log-h1">Welcome back</h1>
          <form className="log-form" onSubmit={handleSubmit}>
            <Input name="Email" placeHolder="Someone@gmail.com" type="email" />
            <Input name="Password" placeHolder="*******" type="password" />
            <Button text="Sign in" type="submit" loading={loading} />
            <div className="log-check-outer">
              <CheckBox type="checkbox" name="Remember Me" />
              <p className="log-check-p">Forgot Password ?</p>
            </div>
            <p className="log-p">Or Continue with</p>
            <div className="log-img-div">
              <img src={Google} alt="google" className="log-img" />
              <img src={Microsoft} alt="microsoft" className="log-img" />
            </div>
          </form>
        </div>
      </div>
      <img
        src="/signup/Subtract.svg"
        alt="Lower SVG"
        className="log-down-svg"
      />
    </>
  );
};

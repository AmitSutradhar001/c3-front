import "../../css/components/signup/OAuthBtn.css";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";

export const OAuthBtn = ({ text, svg, alt, isDisable = false }) => {
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);

      console.log(result);
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
    <>
      <button
        disabled={isDisable}
        onClick={handleGoogleClick}
        className="sig-auth"
      >
        <img src={svg} alt={alt} />
        <p>{text}</p>
      </button>
    </>
  );
};

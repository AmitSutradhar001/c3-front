import "../../css/components/signup/Button.css";

const Button = ({ text, type, loading = null, loadingText = "Loading..." }) => {
  return (
    <>
      <button type={type} disabled={loading} className="signup-btn">
        {loading ? loadingText : text}
      </button>
    </>
  );
};
export default Button;

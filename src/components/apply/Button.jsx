import "../../css/components/apply/Button.css";

const Button = ({ text, type, func }) => {
  return (
    <>
      <button onClick={func} type={type} className="op-btn">
        {text}
      </button>
    </>
  );
};
export default Button;

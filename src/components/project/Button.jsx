import "../../css/components/project/Button.css";

const Button = ({ text, type, func }) => {
  return (
    <>
      <button onClick={func} type={type} className="tb-button">
        {text}
      </button>
    </>
  );
};
export default Button;

import "../../css/components/signup/Input.css";

const Input = ({ type, name, placeHolder = "", svg }) => {
  return (
    <>
      <div className="sig-in-outer">
        <label htmlFor={name} className="sig-in-label">
          {name}
        </label>
        <div className="sig-in-div">
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeHolder}
            className="sig-ipt"
          />
          {svg && <img src={svg} alt="" />}
        </div>
      </div>
    </>
  );
};

export default Input;

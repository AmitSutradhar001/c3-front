import "../../css/components/signup/CheckBox.css";

const CheckBox = ({ name, type, placeHolder }) => {
  return (
    <>
      <div className="sig-chk-outer">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeHolder}
          className="sig-chk-input"
        />
        <label htmlFor={name} className="sig-chk-label">
          {name}
        </label>
      </div>
    </>
  );
};

export default CheckBox;

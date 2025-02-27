import "../../css/components/issue/Input.css";

const Input = ({
  type,
  name,
  placeHolder = "",
  defaultValue = "",
  disabled = false,
}) => {
  return (
    <>
      <div className="in-outer">
        <input
          disabled={disabled}
          defaultValue={defaultValue}
          type={type}
          id={name}
          name={name}
          placeholder={placeHolder}
          className="in-input"
        />

        <label htmlFor={name} className="in-label">
          {name}
        </label>
      </div>
    </>
  );
};

export default Input;

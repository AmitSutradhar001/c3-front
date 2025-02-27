import "../../css/components/contributor/BigBtn.css";

const BigBtn = ({ text, svg = "" }) => {
  return (
    <>
      <div className="bb-outer">
        {svg && <img src={svg} alt="" />}
        <p className="bb-p">{text}</p>
      </div>
    </>
  );
};

export default BigBtn;

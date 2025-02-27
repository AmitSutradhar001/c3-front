import "../../css/components/contributor/SmallBtn.css";

const SmallBtn = ({ text, svg }) => {
  return (
    <>
      <div className="sm-div">
        <p className="sm-p-tag">{text}</p>
        <img src={svg} alt="" className="sm-img-tag" />
      </div>
    </>
  );
};

export default SmallBtn;

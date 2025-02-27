import "../../css/components/issue/AddIssueBtn.css";

const AddIssueBtn = ({ type, text, svg, onClick }) => {
  return (
    <>
      <div onClick={onClick} className="addIssueBtn">
        <img src={svg} alt={text} />
        <button type={type}>{text}</button>
      </div>
    </>
  );
};

export default AddIssueBtn;

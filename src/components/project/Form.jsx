import Input from "../issue/Input";
import downArrow from "/downArrow.svg";
import MultiInput from "../issue/MultiInput";
import Logo from "/collabLogo.png";
import Button from "../signup/Button";
import DatePic from "./DatePic";
import "../../css/components/project/Form.css";
const IssueForm = ({ onFormSubmit = () => {}, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onFormSubmit(formData);
  };

  return (
    <div className="p-form-out">
      <div className="sig-outer">
        <div className="sig-inner">
          <img src={Logo} alt="collab logo" />
          <h1 className="sig-h1">Create Project</h1>
          <form className="sig-form" onSubmit={handleSubmit}>
            <Input
              name={"Title"}
              placeHolder={"Enter Your Project Title!"}
              type={"text"}
            />
            <Input
              name={"Category"}
              placeHolder={"Enter The Category"}
              type={"text"}
            />
            <div className="mt-5">
              <MultiInput
                type={"text"}
                name={"Tech Stack"}
                placeHolder={"#React #Next #MongoDB"}
                svg={downArrow}
              />
            </div>
            <Input
              name={"Content"}
              placeHolder={"Enter The Description"}
              type={"text"}
            />

            <DatePic name={"Last Date"} />

            <Input name={"Image"} placeHolder={""} type={"file"} />
            <Button text={"Submit"} type={"submit"} loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueForm;

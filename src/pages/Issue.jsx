import { useState } from "react";
// import AddIssueBtn from "../components/issue/AddIssueBtn";
import Input from "../components/issue/Input";
import Button from "../components/signup/Button";
// import AddIssue from "/issue/addissuebtn.svg";
import CollabLogo from "/collabLogo.png";
import { useApi } from "../context/ApiContext";
import { useNavigate, useParams } from "react-router-dom";
import MultiInput from "../components/issue/MultiInput";
import downArrow from "/downArrow.svg";
import "../css/pages/Issue.css";
import { toast, ToastContainer } from "react-toastify";
import DatePic from "../components/project/DatePic";
// import { tags } from "../data/dummy";

const Issue = () => {
  const { id } = useParams();

  const api = useApi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("Title");
    const content = formData.get("Description");
    const price = formData.get("Price");
    const tech_stack = formData.get("Tags");
    const date = formData.get("Last Date");
    let endDate = new Date(date);
    const tech_used_Array = tech_stack.split(",");

    if (!title || !content || !tech_stack || !price || !endDate) {
      return toast.warn("Fill the form!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    try {
      setLoading(true);
      const projectsResponse = await api.post(
        "/issue/project-issue",
        {
          projectId: id,
          title,
          price,
          tech_stack: tech_used_Array,
          content,
          endDate,
        },
        {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true,
        }
      );
      if (projectsResponse.status === 201) {
        toast.success("Issue Successfully Created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate(`/projects/admin/${id}`);
        }, 1000);
      }
    } catch (error) {
      console.log(error);

      return toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="isu-outer">
        <ToastContainer style={{ top: "100px" }} />
        <div className="isu-inn">
          <img src={CollabLogo} alt="collab logo" />
          <h1 className="isu-h1">Create an Issue</h1>
          <form className="isu-form" onSubmit={handleSubmit}>
            <Input
              name={"Title"}
              // defaultValue={pdata.title}
              // disabled={true}
              type={"text"}
            />
            <Input
              name={"Description"}
              // defaultValue={pdata.title}
              // disabled={true}
              type={"text"}
            />
            <Input
              name={"Price"}
              // defaultValue={pdata.description}
              // disabled={true}
              type={"number"}
            />
            <MultiInput
              name={"Tags"}
              type={"text"}
              placeHolder={"#uidesigner #uidesigner #uidesigner"}
              svg={downArrow}
            />
            <DatePic name={"Last Date"} />
            {/* <div className="isu-add-div">
              <AddIssueBtn
                type=""
                text={"Add Item"}
                svg={AddIssue}
                onClick={addIssueInput}
              />
            </div> */}
            {/* <div>
              {issueInputs.map((issueInput, index) => (
                <div key={index}>{issueInput}</div>
              ))}
            </div> */}
            <Button
              text={"Submit"}
              type={"submit"}
              loading={loading}
              loadingText="Creating..."
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Issue;

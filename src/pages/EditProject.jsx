import Input from "../components/issue/Input";
import downArrow from "/downArrow.svg";
import MultiInput from "../components/issue/MultiInput";
import Logo from "/collabLogo.png";
import Button from "../components/signup/Button";
import DatePic from "../components/project/DatePic";
import "../css/components/project/Form.css";
import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const EditProject = () => {
  const api = useApi();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pdata, setPdata] = useState(null);
  const { id } = useParams();
  const [dateData, setDateData] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  useEffect(() => {
    async function call() {
      setLoading(true);
      try {
        const projectsResponse = await api.get(`project/get-project/${id}`, {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true,
        });
        setPdata(projectsResponse.data.project);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    call();
  }, [api, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("Title");
    const category = formData.get("Category");
    const tagsString = formData.get("Tech Stack");
    const content = formData.get("Content");
    const endDate = formData.get("Last Date");
    const tech_stack = tagsString.split(", ").map((tag) => tag.trim()); // Convert to array

    let dateObject = new Date(endDate); // Converts to a Date object

    if (!title || !category || !tech_stack || !content || !endDate) {
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
      setIsFormLoading(true);
      const projectsResponse = await api.put(
        `/project/update-project/${id}`,
        {
          userId: user._id,
          title,
          content,
          tech_stack,
          category,
          endDate: dateObject,
        },
        {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true, // Required to send and receive cookies
        }
      );
      console.log(projectsResponse.data);
      if (projectsResponse.status === 200) {
        toast.success("Successfully Updated!", {
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
          navigate(`/projects/admin/`);
        }, 2000);
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
      setIsFormLoading(false);
    }
  };

  if (loading || !pdata) {
    return <Loading />;
  }

  return (
    <div className="edit-p">
      <ToastContainer style={{ top: "100px" }} />
      <div className="p-form-out">
        <div className="sig-outer">
          <div className="sig-inner">
            <img src={Logo} alt="collab logo" />
            <h1 className="sig-h1">Update Project</h1>
            <form className="sig-form" onSubmit={handleSubmit}>
              <Input
                name="Title"
                placeHolder="Enter Your Project Title!"
                type="text"
                defaultValue={pdata.title}
              />
              <Input
                name="Category"
                placeHolder="Enter The Category"
                type="text"
                defaultValue={pdata.category}
              />
              <div className="mt-5">
                <MultiInput
                  type="text"
                  name="Tech Stack"
                  placeHolder="#React #Next #MongoDB"
                  svg={downArrow}
                  defaultValue={pdata.tech_stack}
                />
              </div>
              <Input
                name="Content"
                placeHolder="Enter The Description"
                type="text"
                defaultValue={pdata.content}
              />

              <DatePic name="Last Date" defaultValue={dateData} />

              <Input name="Image" placeHolder="" type="file" />
              <Button text="Submit" type="submit" loading={isFormLoading} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;

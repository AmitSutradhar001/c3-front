import { useState } from "react";
import Form from "../components/project/Form";
import { toast, ToastContainer } from "react-toastify";
import { useApi } from "../context/ApiContext";
import { useSelector } from "react-redux";
import "../css/pages/AddProjects.css";
import { useNavigate } from "react-router-dom";

const AddProjects = () => {
  const api = useApi();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleFormSubmit = async (formData) => {
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
      const projectsResponse = await api.post(
        "/project/create-project",
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
      if (projectsResponse.status === 201) {
        toast.success("Successfully Created!", {
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
          navigate("/projects/admin");
        }, 1000);
      }
    } catch (error) {
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

  return (
    <div className="add-p-outer">
      <ToastContainer style={{ top: "100px" }} />
      <Form onFormSubmit={handleFormSubmit} loading={isFormLoading} />
    </div>
  );
};

export default AddProjects;

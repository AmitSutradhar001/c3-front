import save from "/apply/save.svg";
import share from "/apply/share.svg";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import Toggle from "./applyed/Toggle";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../../css/components/apply/Position.css";

const Position = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const api = useApi();
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const user = useSelector((state) => state.user.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    try {
      const deleteProject = await api.delete(
        `/project/delete-project/${id}`,

        {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true,
        }
      );
      if (deleteProject.status === 200) {
        toast.success("Project is Deleted!", {
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
      return toast.error(error.message || "Delete request failed!", {
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
  };

  return (
    <>
      <div className="outerbox">
        <ToastContainer />
        <Toggle isOn={isOn} setIsOn={setIsOn} deleteHandel={handleDelete} />
        <div className="po-img-div">
          <div className="po-img-outer-div">
            <div className="po-img">
              <img className="w-16 h-16" src={data ? data.postImage : ""} />
            </div>
            <div>
              <h2 className="po-h2">
                {data?.title ? data?.title : data?.name}
              </h2>
              <h3 className="po-h3">
                {data?.subtitle ? data?.subtitle : data?.full_name}
              </h3>
            </div>
          </div>
          <div className="po-img-share">
            <img src={save} alt="save" />
            <img src={share} alt="share" />
            {user.isAdmin && (
              <div className="po-btn-div">
                <button onClick={toggleMenu} className="po-btn-1">
                  <svg
                    className="po-btn-svg"
                    fill="black"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <ul className="po-btn-ul">
                    <button
                      onClick={() => setIsOn(!isOn)}
                      className="po-btn-del"
                    >
                      <span className="po-btn-del-span">Delete</span>
                    </button>
                    <button className="po-btn-del">
                      <Link to={`/projects/edit/${id}`} className="po-btn-edit">
                        Edit
                      </Link>
                    </button>
                    <button className="po-btn-del">
                      <Link
                        to={`/projects/admin/issue/${id}`}
                        className="po-btn-edit"
                      >
                        Add Issue
                      </Link>
                    </button>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
        {/* rating, average, completion*/}
        <div className="po-rac-outer">
          <div className="po-rac-inner">
            <img src="/apply/brifecase-tick.svg" alt="" />
            <div>
              <h2 className="po-rac-h2">Rating</h2>
              <h3 className="po-rac-h3">
                {data?.rating ? data?.rating : "300-400"}
              </h3>
            </div>
          </div>
          <div className="po-rac-inner">
            <img src="/apply/empty-wallet.svg" alt="" />
            <div>
              <h2 className="po-rac-h2">Average Price per issue</h2>
              <h3 className="po-rac-h3">
                ₹{data?.price ? data?.price : "300-400"}
              </h3>
            </div>
          </div>
          <div className="po-rac-inner">
            <img src="/apply/menu-board.svg" alt="" />
            <div>
              <h2 className="po-rac-h2">Completion Date</h2>
              <h3 className="po-rac-h3">
                {new Date(data?.endDate).toLocaleDateString("en-GB")}
              </h3>
            </div>
          </div>
        </div>
        <div className="po-last">
          {data?.tech_stack?.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Position;

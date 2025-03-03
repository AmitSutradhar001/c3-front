// responsivness done.
import Toggle from "../components/apply/applyed/Toggle.jsx";
import AboutAdmin from "../components/apply/AboutAdmin";
import OpenIssue from "../components/apply/applyed/OpenIssue";
import Position from "../components/apply/Position";
import { Link, useParams } from "react-router-dom";
// import { useApi } from "../context/ApiContext";
// import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useApi } from "../context/ApiContext.jsx";
import Loading from "../components/Loading";
import "../css/components/apply/Position.css";
import "../css/components/apply/AboutAdmin.css";
import save from "/apply/save.svg";
import share from "/apply/share.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import "../css/pages/Applyed.css";

const Applyed = () => {
  const { id } = useParams();
  // const issues = [1, 2, 3, 4, 5];
  const [isOpen, setIsOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const api = useApi();
  const [pData, setPdata] = useState(null);
  const [pApply, setpApply] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function call() {
      setLoading(true);
      try {
        const projectsResponse = await api.get(`/project/get-project/${id}`, {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true, // Required to send and receive cookies
        });

        if (projectsResponse.status == 200) {
          setPdata(projectsResponse.data.project);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    async function issueCall() {
      setLoading(true);
      try {
        const projectsResponse = await api.get(
          `/application/get-application-by-project-id/${id}`,
          {
            headers: {
              "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
            },
            withCredentials: true, // Required to send and receive cookies
          }
        );

        if (projectsResponse.status == 200) {
          setpApply(projectsResponse.data.applications);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    call();
    issueCall();
  }, [api, id]);
  if (loading) {
    return <Loading />;
  }
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
      {" "}
      <ToastContainer style={{ top: "100px" }} />
      {pData && (
        <div className="flex flex-col lg:flex-row lg:w-full justify-center md:justify-start pl-5 mt-10 gap-11 md:pl-20 pr-5 lg:pr-20">
          <div className="flex gap-3 w-full flex-col">
            <div className="flex md:w-5/6 lg:w-2/3 flex-col">
              <>
                <div className="outerbox">
                  <Toggle
                    isOn={isOn}
                    setIsOn={setIsOn}
                    deleteHandel={handleDelete}
                  />
                  <div className="po-img-div">
                    <div className="po-img-outer-div">
                      <div className="po-img">
                        <img
                          className="w-16 h-16"
                          src={pData ? pData.postImage : ""}
                        />
                      </div>
                      <div>
                        <h2 className="po-h2">
                          {pData?.title ? pData?.title : pData?.name}
                        </h2>
                        <h3 className="po-h3">
                          {pData?.subtitle ? pData?.subtitle : pData?.full_name}
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
                                <Link
                                  to={`/projects/edit/${id}`}
                                  className="po-btn-edit"
                                >
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
                          {pData?.rating ? pData?.rating : "300-400"}
                        </h3>
                      </div>
                    </div>
                    <div className="po-rac-inner">
                      <img src="/apply/empty-wallet.svg" alt="" />
                      <div>
                        <h2 className="po-rac-h2">Average Price per issue</h2>
                        <h3 className="po-rac-h3">
                          ₹{pData?.price ? pData?.price : "300-400"}
                        </h3>
                      </div>
                    </div>
                    <div className="po-rac-inner">
                      <img src="/apply/menu-board.svg" alt="" />
                      <div>
                        <h2 className="po-rac-h2">Completion Date</h2>
                        <h3 className="po-rac-h3">
                          {new Date(pData?.endDate).toLocaleDateString("en-GB")}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="po-last">
                    {pData?.tech_stack?.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              </>
              <div className="w-full border-t-[1px] mt-5 border-black"></div>
              <div className="flex flex-col lg:w-full justify-center md:justify-start pl-5 mt-10 gap-11">
                <h2 className="text-2xl mt-8 font-bold">About Project</h2>
                <p className="">
                  {pData?.content
                    ? pData.content
                    : "Nulla ac ultrices sed ornare molestie in eget in. Aliquet duis purus libero enim aliquam ultricies dui scelerisque. Vitae pharetra non praesent vulputate ultrices. Tempor semper ut nisi ac. Elementum commodo ut leo aliquet aliquam. Varius faucibus aliquam tellus elementum eu ullamcorper orci ipsum. Orci erat rhoncus posuere a vel vivamus elit tellus sit."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex-col w-full gap-5 justify-center mb-5 items-center md:justify-start mt-2 px-4 pl-10 md:pl-24 pr-5 lg:pr-24">
        <h2 className="text-2xl mt-8 font-bold">List of Applicants</h2>
        <div className="flex flex-col mt-5 justify-start items-start gap-4">
          {pApply.length > 0
            ? pApply.map((issue, index) => (
                <OpenIssue key={index} apply={issue} />
              ))
            : "No Applications!"}
        </div>
      </div>
    </>
  );
};

export default Applyed;

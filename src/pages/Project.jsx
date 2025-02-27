import OpenIssue from "../components/project/OpenIssue";
import Sidebar from "../components/project/Sidebar";
import RightSidebar from "../components/project/RightSidebar";
import Topbar from "../components/project/Topbar";
import AddIssue from "/issue/addissuebtn.svg";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useApi } from "../context/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/projectsSlice.js";
import "../css/pages/Project.css";
import { Link } from "react-router-dom";

const Project = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [userProjects, setUserProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3; // Set to 3 for demonstration

  useEffect(() => {
    async function projectCall() {
      setLoading(true);
      try {
        const projectsResponse = await api.get(
          `/project/get-all-projects-by-userid/${user._id}`,
          {
            headers: {
              "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
            },
            withCredentials: true,
          }
        );

        if (projectsResponse.status === 200) {
          dispatch(set(projectsResponse.data.projects));
          setUserProjects(projectsResponse.data.projects);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    projectCall();
  }, [api, dispatch]);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = userProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Sidebar />
      <div className="pj-outer">
        <div className="pj-inner">
          <Topbar />
          <div className="pj-issue-outer">
            <div className="pj-issue-inner">Open Source Projects</div>
            <div className="pj-img-btn">
              <img src={AddIssue} alt="add" />
              <Link to={"/projects/add"}>Add Projects</Link>
            </div>
          </div>
          <div className="pj-s-last">
            {currentProjects.length > 0 ? (
              currentProjects.map((project, index) => (
                <OpenIssue key={index} project={project} />
              ))
            ) : (
              <p>No projects available</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pj-pg-outer">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="pj-pg-btn-1"
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pj-pg-svg"
                viewBox="0 0 24 24"
                id="left-arrow"
              >
                <path d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"></path>
              </svg>
            </button>
            {Array.from({
              length: Math.ceil(projects.length / projectsPerPage),
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`pj-pg-btn ${
                  currentPage === i + 1 ? "pj-pg-btn-a" : "pj-pg-btn-i"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              className="pj-pg-btn-1"
              disabled={indexOfLastProject >= projects.length}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pj-pg-svg"
                viewBox="0 0 24 24"
                id="right-arrow"
              >
                <path d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="pj-last">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default Project;

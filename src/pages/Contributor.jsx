import OpenIssue from "../components/project/OpenIssue";
import Sidebar from "../components/project/Sidebar";
import RightSidebar from "../components/project/RightSidebar";
import { useEffect, useState } from "react";
import BigBtn from "../components/contributor/BigBtn";
import sq from "/project/sq.svg";
import Loading from "../components/Loading";
import { useApi } from "../context/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/projectsSlice.js";
import { gitSet, gitRemove } from "../redux/gitAndCollabProject.js";
import GitIssue from "../components/project/GitIssue.jsx";
import { predefinedOrder, keywordMappings } from "../data/dummy.js";
import "../css/pages/Contributor.css";

const Contributor = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const { git } = useSelector((state) => state.gitAndCollabProject);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  // Helper function to find the index based on keyword mappings
  const findIndexInOrder = (projectName) => {
    return predefinedOrder.findIndex((orderItem) =>
      keywordMappings[orderItem].some((keyword) =>
        projectName.toLowerCase().includes(keyword)
      )
    );
  };

  // Fetch GitHub projects
  const gitProjects = async () => {
    try {
      const response = await api.get(
        import.meta.env.VITE_GITHUB_PROJECTS_ENDPOINT,
        {
          headers: {
            "Content-Type": import.meta.env.VITE_PROJECTS_HEADERS,
          },
        }
      );
      if (response.status === 200) {
        const sortedProjects = response.data.items.sort((a, b) => {
          const aIndex = findIndexInOrder(a.name);
          const bIndex = findIndexInOrder(b.name);
          return aIndex !== -1 && bIndex !== -1
            ? aIndex - bIndex
            : aIndex !== -1
            ? -1
            : 1;
        });
        dispatch(set(sortedProjects));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Collab projects
  const collabProjects = async () => {
    try {
      const response = await api.get("/project/get-all-projects", {
        headers: {
          "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
        },
        withCredentials: true, // Required to send and receive cookies
      });
      if (response.status === 200) {
        const sortedProjects = response.data.projects.sort((a, b) => {
          const aIndex = findIndexInOrder(a.title);
          const bIndex = findIndexInOrder(b.title);
          return aIndex !== -1 && bIndex !== -1
            ? aIndex - bIndex
            : aIndex !== -1
            ? -1
            : 1;
        });
        dispatch(set(sortedProjects));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of projects
  useEffect(() => {
    setLoading(true);
    if (git) {
      gitProjects();
    } else {
      collabProjects();
    }
  }, [git]);

  const handleGitClick = () => {
    dispatch(gitSet());
    setLoading(true);
    gitProjects();
    setCurrentPage(1); // Reset to first page
  };

  const handleCollabClick = () => {
    dispatch(gitRemove());
    setLoading(true);
    collabProjects();
    setCurrentPage(1); // Reset to first page
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
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
      <div className="con-outer">
        <div className="con-inner">
          <div className="con-inner-div">
            <BigBtn text={"All Issues"} />
            <BigBtn text={"xyzsdf"} svg={sq} />
            <BigBtn text={"xyzsdf"} svg={sq} />
            <BigBtn text={"xyzsdf"} svg={sq} />
          </div>
          <div className="con-n-inn">
            <div className="con-n2-inn">
              <p className="con-in-p">Select One -{">"}</p>
              <button className="con-in-btn-1" onClick={handleGitClick}>
                GitHub Projects
              </button>
              <button className="con-in-btn-2" onClick={handleCollabClick}>
                Collab Projects
              </button>
            </div>
          </div>

          <div className="con-issue-div">
            {currentProjects.length > 0 ? (
              currentProjects.map((project, index) =>
                git ? (
                  <GitIssue key={index} project={project} />
                ) : (
                  <OpenIssue key={index} project={project} />
                )
              )
            ) : (
              <p>No projects available</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="con-pg-out">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="con-pg-btn-1"
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="con-pg-svg"
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
                className={`con-pg-btn-3 ${
                  currentPage === i + 1 ? "con-pg-a" : "con-pg-i"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              className="con-pg-btn-1"
              disabled={indexOfLastProject >= projects.length}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="con-pg-svg"
                viewBox="0 0 24 24"
                id="right-arrow"
              >
                <path d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="con-last">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default Contributor;

import AboutAdmin from "../components/apply/AboutAdmin";
import OpenIssue from "../components/apply/OpenIssue";
import Position from "../components/apply/Position";
import { useParams } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/pages/Apply.css";

const Applying = () => {
  const { id } = useParams();
  const api = useApi();
  const { singleProject } = useSelector((state) => state.gitAndCollabProject);
  const [idata, setIdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 4;
  useEffect(() => {
    async function issueCall() {
      try {
        const issuesResponse = await api.get(
          `https://api.github.com/repos/${singleProject.owner.login}/${singleProject.name}/issues?state=open`,
          {
            headers: {
              "Content-Type": import.meta.env.VITE_ADD_PROJECT_ISSUE_HEADERS,
            },
          }
        );
        setIdata(issuesResponse.data);
        console.log(issuesResponse.data);
      } catch (error) {
        console.log("Issue call error:", error.message);
      }
    }
    issueCall();
  }, [api, id, singleProject]);

  if (loading) {
    return <Loading />;
  }

  // Calculate the start and end index of the issues to display
  const startIndex = (cur - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIssues = idata?.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(idata?.length / itemsPerPage);

  function Next() {
    if (cur < totalPages) {
      setCur(cur + 1);
    }
  }

  function back() {
    if (cur > 1) {
      setCur(cur - 1);
    }
  }

  return (
    <>
      <div className="outrbox">
        <div className="innerbox">
          <Position data={singleProject} />
          <div className="ay-i-div"></div>
          <AboutAdmin data={singleProject} />
        </div>
      </div>
      <div className="ay-issue-outer">
        <h2 className="ay-issue-h2">List of Open Issues</h2>
        <div className="ay-issue-i-div">
          {/* {currentIssues.map((issue, index) =>
            issue.project.id == id ? (
              <OpenIssue key={index} issue={issue} />
            ) : null
          )} */}
          {!currentIssues ? (
            <p>Nothing</p>
          ) : (
            currentIssues.map((issue, index) => (
              <OpenIssue key={index} issue={issue} />
            ))
          )}
        </div>
        <div className="ay-last-div ">
          <button onClick={back} className="ay-last-btn-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ay-last-svg-1"
              viewBox="0 0 24 24"
              id="left-arrow"
            >
              <path d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"></path>
            </svg>
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i + 1)}
              className={`ay-last-btn-2 ${
                cur === i + 1 ? "ay-last-btn-2-a" : "ay-last-btn-2-i"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={Next} className="ay-last-btn-1">
            <svg
              className="ay-last-svg-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="right-arrow"
            >
              <path d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Applying;

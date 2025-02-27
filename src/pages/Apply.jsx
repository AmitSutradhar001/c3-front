import AboutAdmin from "../components/apply/AboutAdmin";
import OpenIssue from "../components/apply/OpenIssue";
import Position from "../components/apply/Position";
import { useParams } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/pages/Apply.css";

const Apply = () => {
  const { id } = useParams();
  const api = useApi();
  const { singleProject } = useSelector((state) => state.gitAndCollabProject);
  const [isOn, setIsOn] = useState(false);
  const [idata, setIdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cur, setCur] = useState(1);
  const itemsPerPage = 4;
  useEffect(() => {
    async function issueCall() {
      try {
        const issuesResponse = await api.get(
          `/issue/all-project-issues-by/${id}`,
          {
            headers: {
              "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
            },
            withCredentials: true,
          }
        );
        setIdata(issuesResponse.data.issues);
        console.log(issuesResponse.data.issues);
      } catch (error) {
        console.log("Issue call error:", error.message);
      } finally {
        setLoading(false);
      }
    }
    issueCall();
  }, [api, id]);

  if (loading) {
    return <Loading />;
  }

  // Calculate the start and end index of the issues to display
  const currentIssues = idata && idata.filter((issue) => issue.projectId == id);
  const startIndex = (cur - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const allIssues = currentIssues && currentIssues.slice(startIndex, endIndex);
  console.log(allIssues);
  // Calculate total pages
  const totalPages = Math.ceil(idata.length / itemsPerPage);

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
  const toggleApplyBox = () => {
    setIsOn(!isOn);
  };

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
        <h2 className="ay-issue-h2">
          {allIssues.length > 0 ? "List of Open Issues" : "There is no issue"}
        </h2>
        <div className="ay-issue-i-div">
          {allIssues.map((issue, index) => (
            <OpenIssue
              isOn={isOn}
              key={index}
              issue={issue}
              onApplyClick={toggleApplyBox}
            />
          ))}
        </div>
        {allIssues.length > 0 && (
          <div className="ay-last-div">
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
        )}
      </div>
    </>
  );
};

export default Apply;

// responsivness done.

import AboutAdmin from "../components/apply/AboutAdmin";
import OpenIssue from "../components/apply/applyed/OpenIssue";
import Position from "../components/apply/Position";
import { useParams } from "react-router-dom";
// import { useApi } from "../context/ApiContext";
import "../css/pages/Applyed.css";
// import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useApi } from "../context/ApiContext";
import Loading from "../components/Loading";

const Applyed = () => {
  const { id } = useParams();
  // const issues = [1, 2, 3, 4, 5];
  const api = useApi();
  const [pdata, setPdata] = useState(null);
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
      } finally {
        setLoading(false);
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
  console.log(pdata);

  return (
    <>
      <div className={`ad-outer `}>
        <ToastContainer style={{ top: "100px" }} />
        <div className="ad-m-1">
          <div className="ad-inner">
            <Position data={pdata} />
            <div className="ad-ab"></div>
            <AboutAdmin data={pdata} />
          </div>
        </div>
      </div>

      <div className="ad-middle-div">
        <h2 className="ad-h2">List of Applicants</h2>
        <div className="ad-middle-inner">
          {pApply && pApply.length > 0
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

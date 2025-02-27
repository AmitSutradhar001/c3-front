import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useApi } from "../context/ApiContext";
import AboutAdmin from "../components/apply/AboutAdmin";
import OpenIssue from "../components/apply/applyed/OpenIssue";
import Position from "../components/apply/Position";
import "../css/pages/Applyed.css";

const Applyed = () => {
  const { id } = useParams();
  const api = useApi();
  const [pdata, setPdata] = useState(null);
  const [pApply, setpApply] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectRes, applicationRes] = await Promise.all([
          api.get(`/project/get-project/${id}`, {
            headers: {
              "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
            },
            withCredentials: true,
          }),
          api.get(`/application/get-application-by-project-id/${id}`, {
            headers: {
              "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
            },
            withCredentials: true,
          }),
        ]);

        if (projectRes.status === 200) setPdata(projectRes.data.project);
        if (applicationRes.status === 200)
          setpApply(applicationRes.data.applications);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, [api, id]);

  console.log("pdata:", pdata);
  console.log("pApply:", pApply);

  return (
    <>
      <div className="ad-outer">
        <ToastContainer style={{ top: "100px" }} />
        {pdata && (
          <div className="ad-m-1">
            <div className="ad-inner">
              <Position data={pdata} />
              <div className="ad-ab"></div>
              <AboutAdmin data={pdata} />
            </div>
          </div>
        )}
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

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
  const [pApply, setpApply] = useState([]);

  useEffect(() => {
    console.log("Fetching data...");

    async function fetchData() {
      try {
        const [projectRes, applicationRes] = await Promise.all([
          api.get(`/project/get-project/${id}`, {
            headers: { "Content-Type": import.meta.env.VITE_EXPRESS_HEADER },
            withCredentials: true,
          }),
          api.get(`/application/get-application-by-project-id/${id}`, {
            headers: { "Content-Type": import.meta.env.VITE_EXPRESS_HEADER },
            withCredentials: true,
          }),
        ]);

        setPdata(projectRes.data.project || {}); // Ensure `pdata` is always an object
        setpApply(applicationRes.data.applications || []); // Default to empty array
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [api, id]);

  useEffect(() => {
    console.log("pdata updated:", pdata);
  }, [pdata]);

  return (
    <>
      <div className="ad-outer">
        <ToastContainer style={{ top: "100px" }} />
        {pdata ? (
          <div className="ad-m-1">
            <div className="ad-inner">
              <Position data={pdata} />
              <div className="ad-ab"></div>
              <AboutAdmin data={pdata} />
            </div>
          </div>
        ) : (
          <p>Loading project details...</p>
        )}
      </div>

      <div className="ad-middle-div">
        <h2 className="ad-h2">List of Applicants</h2>
        <div className="ad-middle-inner">
          {pApply.length > 0 ? (
            pApply.map((issue, index) => (
              <OpenIssue key={index} apply={issue} />
            ))
          ) : (
            <p>No Applications!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Applyed;

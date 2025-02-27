import GroupCard from "../components/clan/GroupCard";
import FilterScreen from "../components/clan/FilterScreen";
import { fetchClanData } from "../clanFirebase.js";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading.jsx";
import { useApi } from "../context/ApiContext.jsx";
import CreateClan from "../components/clan/CreateClan.jsx";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ClanList = () => {
  const [searchClan, setSearchClan] = useState("");
  const [popup, setPopup] = useState(false);
  const [clanPopup, setClanPopup] = useState(false);
  const [clanData, setClanData] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const handlePopup = () => {
    setPopup(!popup);
  };
  const handleSearch = async () => {
    if (!searchClan.trim()) {
      alert("Please enter a clan name");
      return;
    }
    console.log(searchClan);

    try {
      const response = await api.post("/clan/search", {
        query: searchClan,
      });
      if (response.status == 200) {
        setClanData(response.data);
      }
      // Handle response (e.g., update state, show results, etc.)
    } catch (error) {
      console.error("Error searching clan:", error);
      return toast.info("No clan with the search name!", {
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
  const handleClanPopup = () => {
    setClanPopup(!clanPopup);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get("/clan/all", {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true, // Required to send and receive cookies
        });
        if (response.status === 200) {
          setClanData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  if (!clanData) return <Loading />;
  return (
    <>
      <ToastContainer style={{ top: "100px" }} />
      <div className="flex justify-center items-start w-full">
        <div className="w-10/12  flex-wrap flex gap-3 justify-center items-center mt-8">
          {user?.isAdmin && (
            <button
              disabled={popup}
              onClick={handleClanPopup}
              className="px-5 w-32 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md text-white font-semibold"
            >
              {clanPopup ? "Cancle" : "New Clan"}
            </button>
          )}
          <div className="flex gap-4 justify-start items-center py-1 px-2 w-6/12 border-[1px] border-gray-400 rounded-sm min-w-52">
            <svg
              width="25"
              height="26"
              viewBox="0 0 29 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8957 25.875C20.2354 25.875 25.3748 20.7356 25.3748 14.3958C25.3748 8.05605 20.2354 2.91666 13.8957 2.91666C7.5559 2.91666 2.4165 8.05605 2.4165 14.3958C2.4165 20.7356 7.5559 25.875 13.8957 25.875Z"
                stroke="#D9D9D9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26.5832 27.0833L24.1665 24.6667"
                stroke="#D9D9D9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              value={searchClan}
              onChange={(e) => setSearchClan(e.target.value)}
              placeholder="Search Clans"
              className="text-start outline-none"
            />
          </div>
          <div className="flex justify-start items-center gap-3">
            <button
              disabled={clanPopup}
              onClick={handleSearch}
              className={
                popup
                  ? " px-5 w-24 py-1 font-semibold bg-gray-300 rounded-md text-white"
                  : "px-5 w-24 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md text-white font-semibold"
              }
            >
              Search
            </button>
            <button
              onClick={handlePopup}
              disabled={clanPopup}
              className="px-5 w-32 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md text-white font-semibold"
            >
              {popup ? "Hide Filter" : "Filter"}
            </button>
          </div>
        </div>
      </div>
      {popup ? (
        <FilterScreen />
      ) : clanPopup ? (
        <CreateClan />
      ) : (
        <div className="flex w-full justify-center items-start">
          <div className="flex mt-8 gap-4 mb-10 flex-col justify-center items-center w-8/12">
            {clanData?.map((item) => (
              <GroupCard key={item?._id} clanData={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default ClanList;

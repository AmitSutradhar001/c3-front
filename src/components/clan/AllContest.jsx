import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useApi } from "../../context/ApiContext.jsx";

const AllContests = () => {
  const [data, setData] = useState([]); // Store upcoming/ongoing contests
  const { user } = useSelector((state) => state.user);
  const api = useApi();

  useEffect(() => {
    async function fetchAllContests() {
      try {
        const res = await api.get(`/contest/all/`, {
          headers: { "Content-Type": import.meta.env.VITE_EXPRESS_HEADER },
          withCredentials: true,
        });
        console.log(res.data);
        setData(res.data)
       
      } catch (error) {
        if (error.response?.status === 404) return []; // Handle 404 by returning empty array
        console.error("Error fetching admin contests:", error);
        return [];
      }
    }
    fetchAllContests();
  }, [user]);

  return (
    <>
      {/* Contest List */}
      <div className="w-full">
        {data.length > 0 ? (
          data.map((contest) => (
            <div
              key={contest._id}
              className="flex flex-wrap items-center justify-between p-4"
            >
              <div className="flex items-center space-x-4">
                {/* Placeholder for contest image */}
                <div className="w-40 h-16 bg-gray-300 rounded-lg"></div>
                <div>
                  <h3 className="text-lg font-semibold">{contest.name}</h3>
                  <p className="text-gray-500">
                    {new Date(contest.date).toLocaleString("en-IN", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                </div>
              </div>
              <Link
                to={`/contest_description_page/${contest._id}`}
                className="font-semibold"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No past contests available.
          </p>
        )}
      </div>
    </>
  );
};

export default AllContests;

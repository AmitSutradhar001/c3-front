import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useApi } from "../../context/ApiContext.jsx";

const MyContests = () => {
  const [data, setData] = useState([]); // Store upcoming/ongoing contests
  const { user } = useSelector((state) => state.user);
  const api = useApi();

  useEffect(() => {
    async function fetchAdminContest() {
      try {
        const res = await api.get(`/contest/by-adminId/${user?._id}`, {
          headers: { "Content-Type": import.meta.env.VITE_EXPRESS_HEADER },
          withCredentials: true,
        });
        return res.data || [];
      } catch (error) {
        if (error.response?.status === 404) return []; // Handle 404 by returning empty array
        console.error("Error fetching admin contests:", error);
        return [];
      }
    }

    async function fetchClanContest() {
      try {
        const res = await api.get(`/contest/by-clanId/${user?.clanId}`, {
          headers: { "Content-Type": import.meta.env.VITE_EXPRESS_HEADER },
          withCredentials: true,
        });
        return res.data || [];
      } catch (error) {
        if (error.response?.status === 404) return []; // Handle 404 by returning empty array
        console.error("Error fetching clan contests:", error);
        return [];
      }
    }

    async function fetchData() {
      let adminData = [];
      let clanData = [];

      if (user.isAdmin) {
        if (user.clanId) {
          [adminData, clanData] = await Promise.all([
            fetchAdminContest(),
            fetchClanContest(),
          ]);
        } else {
          adminData = await fetchAdminContest();
        }
      } else if (user.clanId) {
        clanData = await fetchClanContest();
      }

      // Merge and filter only upcoming or ongoing contests
      const currentDate = new Date();
      const mergedData = [...adminData, ...clanData]
        .filter(
          (contest, index, self) =>
            index === self.findIndex((c) => c._id === contest._id) // Remove duplicates
        )
        .filter((contest) => new Date(contest.date) >= currentDate); // Keep only upcoming or ongoing contests

      setData(mergedData);
    }

    fetchData();
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
            No future contests available.
          </p>
        )}
      </div>
    </>
  );
};

export default MyContests;

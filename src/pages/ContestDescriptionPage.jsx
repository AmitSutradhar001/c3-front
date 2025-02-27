import { useParams } from "react-router-dom";
import ContestRight from "../components/clan/Contestright";
import Countdown from "../components/clan/Countdown";
import Prize from "../components/clan/Prize";
import { useEffect, useRef, useState } from "react";
import { useApi } from "../context/ApiContext.jsx";

const ContestDescriptionPage = () => {
  const { id } = useParams();
  const [contest, setContestData] = useState(null);
  const api = useApi();
  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/contest/by-id/${id}`, {
        headers: {
          "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
        },
        withCredentials: true, // Required to send and receive cookies
      });
      // console.log(clanResponse);
      if (res.status == 200) {
        setContestData(res.data);
      }
    }
    fetchData();
  }, []);
  console.log(contest);

  return (
    <>
      <div className="w-full flex justify-start items-center">
        <div className="px-0 sm:px-5 lg:px-20 py-10 w-full">
          <p className="text-4xl font-medium pb-5">{contest?.name}</p>
          <div className="h-screen w-full flex gap-5 flex-col md:flex-row">
            <div className="w-full md:w-3/5 ">
              <ContestRight contest={contest} setContestData={setContestData} />
            </div>
            <div className="w-full md:w-2/5 flex flex-col gap-5">
              <Countdown contest={contest} />
              <Prize contest={contest} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContestDescriptionPage;

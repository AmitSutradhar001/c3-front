import { useParams } from "react-router-dom";
import StatusCard from "../components/clan/StatusCard";
import { useApi } from "../context/ApiContext.jsx";
import { useEffect, useState } from "react";

const DetailScreen = () => {
  const { id } = useParams();
  const [data, setDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const api = useApi();
  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/receipt/by-id/${id}`, {
        headers: {
          "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
        },
        withCredentials: true, // Required to send and receive cookies
      });
      console.log(res.data);
      setDate(res.data);
      const date = new Date(res.data.date);
      setFormattedDate(
        date.toLocaleString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full flex justify-center items-start py-8 lg:px-24">
        <div className="flex flex-col md:flex-row gap-5 w-10/12">
          {/* first div */}
          <div className="w-3/5 min-w-80 border-[1px] border-black rounded-md bg-[#F9F9F9]">
            <div className="border-b-[1px] p-2 border-black flex-wrap flex justify-between items-center gap-2">
              <p className="text-xl font-medium">Transaction Details</p>
              <p className="text-sm font-medium">{formattedDate}</p>
            </div>
            <div className="px-2 py-4 lg:w-2/3">
              <div className="w-full flex justify-start items-center">
                <div className="w-1/2 font-semibold">Id. </div>
                <div className="w-1/2 text-sm">{data?._id}</div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <p className="font-semibold">FORM</p>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold">Admin ID </div>
                  <div className="w-1/2 text-sm">{data?.clanId}</div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold">Sender Name </div>
                  <div className="w-1/2 text-sm">{data?.clanName}</div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold">Account No. </div>
                  <div className="w-1/2 text-sm">XXXXXXXX8765</div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold">IFSC ID </div>
                  <div className="w-1/2 text-sm">XXXXXXXX8765 </div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold ">Bank Name </div>
                  <div className="w-1/2 text-sm">KOTAK MAHINDRA BANK </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <p className="font-semibold">TO</p>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold">Contributor ID </div>
                  <div className="w-1/2 text-sm">{data?.userId}</div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold">Receiver Name </div>
                  <div className="w-1/2 text-sm">{data?.userName}</div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold">Account No. </div>
                  <div className="w-1/2 text-sm">XXXXXXXX8765</div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold">IFSC ID </div>
                  <div className="w-1/2 text-sm">XXXXXXXX8765 </div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="w-1/2 font-semibold ">Bank Name </div>
                  <div className="w-1/2 text-sm">KOTAK MAHINDRA BANK </div>
                </div>
              </div>
            </div>
          </div>
          {/* second div */}
          <div className="w-2/5">
            <StatusCard data={data} formattedDate={formattedDate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailScreen;

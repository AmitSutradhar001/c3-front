import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../context/ApiContext";

const Transactionhistory = () => {
  const { clanId } = useParams();
  const [data, setDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const api = useApi();
  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`receipt/all-by/${clanId}`, {
        headers: {
          "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
        },
        withCredentials: true, // Required to send and receive cookies
      });
      console.log(res.data);
      setDate(res.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full flex justify-start items-start">
        <div className="px-20 pt-10 w-full">
          {/* 1st div */}
          <div className="w-2/3 py-4">
            <p className="text-2xl font-semibold">Transactions</p>
          </div>
          {/* table */}
          <div className="relative border-[1px] border-gray-400 rounded-lg overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className=" ml-10 text-xs rounded-lg bg-gradient-to-r from-purple-500 to-blue-400  text-white ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Admin Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Points
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data?.map((item) => {
                  const date = new Date(item?.date);
                  const dateFormat = date.toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });
                  return (
                    <>
                      <tr className=" bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 flex gap-2 font-medium text-gray-900 whitespace-nowrap "
                        >
                          <div className="w-5 h-5 p-5 rounded-lg bg-green-200"></div>
                          <div className="text-sm font-normal">
                            <p className="font-semibold">{item?.userName}</p>
                            <p>ID: {item?.userId}</p>
                          </div>
                        </th>
                        <td className="px-6 py-4 w-40">
                          <div className="w-full text-sm">
                            <p className="overflow-hidden font-semibold">
                              {item?.itemPerchesed}
                            </p>
                            <p>{item?._id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 w-40">
                          <div className="w-full text-sm">
                            <p className="overflow-hidden font-semibold">
                              {dateFormat}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          ₹ {item?.pointSpend}
                        </td>
                        <td className="px-6 py-4 font-semibold ">
                          {item?.status}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/detail-screen/${item?._id}`}
                            className="px-4 py-1 text-white bg-gradient-to-r from-purple-500 to-blue-500 font-semibold rounded-md"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Transactionhistory;

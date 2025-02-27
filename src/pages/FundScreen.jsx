import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApi } from "../context/ApiContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const FundScreen = () => {
  const { clanId } = useParams();
  const { user } = useSelector((state) => state.user);
  const [point, setPoint] = useState(0);
  const [fundData, setFundData] = useState(null);
  const api = useApi();
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchData() {
      const fundResponse = await api.get(`/clan/by-id/${clanId}`, {
        headers: {
          "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
        },
        withCredentials: true, // Required to send and receive cookies
      });
      setFundData(fundResponse.data.clan);
      // console.log(fundResponse.data);
    }
    fetchData();
  }, []);
  const clickSubmit = async (e) => {
    e.preventDefault();
    if (point == 0)
      return toast.info("The point is zero! it's not possible to withdraw!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    if (point > fundData?.clanPoints)
      return toast.info(
        "The point is not sufficient! it's not possible to withdraw!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    try {
      const res = await api.put(
        `/clan/update/${clanId}`,
        { clanPoints: Number(fundData.clanPoints) - point },
        {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true, // Required to send and receive cookies
        }
      );
      if (res.status == 200) {
        setFundData(res.data.clan);
        setPoint(0);
        const receiptRes = await api.post(
          `/receipt/create/`,
          {
            userId: user._id,
            userName: user.fullname,
            clanId: fundData._id,
            clanName: fundData.name,
            pointSpend: point,
            date: new Date().toISOString(),
          },
          {
            headers: {
              "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
            },
            withCredentials: true, // Required to send and receive cookies
          }
        );        
          toast.info("The point withdraw is successfull!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        setTimeout(() => navigate(`/detail-screen/${receiptRes.data._id}`));
          
      }
    } catch (error) {
      return toast.success(error.message, {
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

  return (
    <>
      <ToastContainer style={{ top: "100px" }} />
      <div className="w-full h-screen flex justify-center items-start ">
        <div className="w-full h-full md:w-8/12 md:h-3/6 shadow-md border-2 rounded-md mt-14 flex flex-col md:flex-row">
          <div className="w-full lg:w-3/5 flex  justify-center items-start p-8 pr-4">
            <div className="w-full bg-[#F9F9F9] flex flex-col border-2 h-fit rounded-md">
              <div className="flex justify-between items-start p-4 border-b-2">
                <div className="flex-wrap">
                  <p className="font-semibold">Total Available Points</p>
                  <p>₹ {fundData?.clanPoints}</p>
                </div>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2 8.4H10.8V6H13.2M13.2 18H10.8V10.8H13.2M12 0C10.4241 0 8.86371 0.310389 7.4078 0.913446C5.95189 1.5165 4.62902 2.40042 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C4.62902 21.5996 5.95189 22.4835 7.4078 23.0866C8.86371 23.6896 10.4241 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 10.4241 23.6896 8.86371 23.0866 7.4078C22.4835 5.95189 21.5996 4.62902 20.4853 3.51472C19.371 2.40042 18.0481 1.5165 16.5922 0.913446C15.1363 0.310389 13.5759 0 12 0Z"
                    fill="#111111"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-start p-4 border-b-2">
                <p className="font-semibold">Points to withdraw</p>
                <div className="flex gap-2 justify-center items-center">
                  <p className="text-lg">
                    00.<span className="text-sm">00</span>
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    id="right-arrow"
                  >
                    <path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex justify-between items-start p-4">
                <Link to={`/transaction-history/${clanId}`} className="font-semibold">
                  View all transactions
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  id="right-arrow"
                >
                  <path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 flex justify-center items-start p-8 pl-4">
            <form
              onSubmit={clickSubmit}
              className="w-full bg-[#F9F9F9] flex flex-col border-2 h-fit rounded-md"
            >
              <div className="border-b-2 flex p-4 justify-center items-center font-semibold">
                Withdraw Points
              </div>
              <div className="border-b-2 flex flex-col gap-4 p-4 justify-center items-center text-sm">
                <div className=" flex justify-between items-center w-full">
                  <p>Withdrawable Points</p>
                  <p>₹ {fundData?.clanPoints}</p>
                </div>
                <div className=" flex justify-between items-center w-full">
                  <p>Enter Point</p>
                  <input
                    type="number"
                    className="text-lg w-20 placeholder:text-end outline-none text-end"
                    max={Number(fundData?.clanPoints)}
                    placeholder="00.00"
                    value={point}
                    onChange={(e) => {
                      e.preventDefault();
                      setPoint(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className=" flex flex-col gap-4 p-4 justify-center items-center text-sm">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 rounded-md mb-2"
                >
                  WITHDRAW Points
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default FundScreen;

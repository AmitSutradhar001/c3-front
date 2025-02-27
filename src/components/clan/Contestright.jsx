import { useParams } from "react-router-dom";
import { useApi } from "../../context/ApiContext";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContestRight = ({ contest, setContestData }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  const api = useApi();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        `/contest/update/${id}`,
        { clanId: user?.clanId },
        {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true, // Required to send and receive cookies
        }
      );
      // console.log(clanResponse);
      if (res.status == 200) {
        setContestData(res.data.contest);
        console.log(res.data);

        return toast.success("Success!", {
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
    } catch (error) {
      return toast.error("Failed!", {
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
  const cancleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        `/contest/cancle/${id}`,
        { clanId: user?.clanId }, // Make sure clanId is correctly sent
        {
          headers: {
            "Content-Type": "application/json", // Fix content-type
          },
          withCredentials: true, // Required to send and receive cookies
        }
      );

      if (res.status === 200) {
        setContestData(res.data.contest);
        console.log(res.data);
        return toast.success("Registration canceled successfully!", {
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
    } catch (error) {
      console.error("Cancel registration error:", error);
      return toast.error("Failed to cancel registration!", {
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
    <div className="w-full p-4 bg-[#F9F9F9] shadow-lg rounded-lg">
      <ToastContainer style={{ top: "100px" }} />

      <h1 className="text-2xl font-bold mb-4">WELCOME!</h1>
      <p className="text-gray-600 mb-6">{contest?.message}</p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">No. of Issues</h2>
        <p className="text-gray-500">{contest?.noOfIssues}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Important Note</h2>
        <p className="text-gray-600 mb-4">{contest?.note}</p>
        <h3 className="font-semibold">Rules And Regulations</h3>
        <p className="text-gray-600">{contest?.rules}</p>
      </div>
      {user?.isAdmin && (
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
          {contest?.participents?.includes(user?.clanId) ? (
            <>
              <p className="text-gray-500">
                You are already registered for the contest!
              </p>
              <button
                onClick={cancleRegistration}
                className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-md"
              >
                Cancel Registration
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-500">Register Now for the contest!</p>
              <button
                onClick={handleClick}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-md"
              >
                Register Now
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ContestRight;

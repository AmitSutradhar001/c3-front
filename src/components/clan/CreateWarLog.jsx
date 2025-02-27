import { useApi } from "../../context/ApiContext.jsx";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/userSlice.js";
const CreateWarLog = () => {
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const clanLeader = user.fullname;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const warDate = formData.get("date");
    const opponentClan = formData.get("clan");

    const clanType = formData.get("clanType");
    const requiredSolvedIssues = parseInt(
      formData.get("requiredSolvedIssues") || 0,
      10
    );
    if (!name || !clanLeader || !location || !clanType) {
      return toast.warn("Fill the form!", {
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
    try {
      const response = await api.post(
        "/clan/create",
        {
          name,
          clanLeader,
          location,
          clanType,
          requiredSolvedIssues,
          members: user._id,
        },
        {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
          withCredentials: true, // Required to send and receive cookies
        }
      );
      if (response.status === 201) {
        dispatch(login(response.data.user));
        setTimeout(() => {
          navigate(`/clan/${response.data.clan._id}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
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

      <form class="max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* <div className="flex mt-8 gap-4 mb-10 flex-col justify-center items-center w-full">
        <div className="flex bg-[#F6F6F6] flex-col justify-center items-center w-full md:w-10/12 lg:w-8/12 border-[1px] border-purple-500 px-8 py-4 bg-gradient-to-r from-blue-200 to-purple-300 rounded-md  font-semibold">
          <form onSubmit={handleSubmit} className=" mx-auto w-full p-6 ">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Clan</h2>

            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Clan Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded-md mb-4"
              required
            />

            <label
              htmlFor="location"
              className="block text-sm font-medium mb-1"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full p-2 border rounded-md mb-4"
              required
            />

            <label
              htmlFor="clanType"
              className="block text-sm font-medium mb-1"
            >
              Clan Type
            </label>
            <input
              type="text"
              id="clanType"
              name="clanType"
              className="w-full p-2 border rounded-md mb-4"
              required
            />
            <label
              htmlFor="requiredSolvedIssues"
              className="block text-sm font-medium mb-1"
            >
              Required Solved Issues
            </label>
            <input
              type="number"
              id="requiredSolvedIssues"
              name="requiredSolvedIssues"
              className="w-full p-2 border rounded-md mb-4"
            />

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-medium rounded-md"
            >
              Create Clan
            </button>
          </form>
        </div>
      </div> */}
    </>
  );
};
export default CreateWarLog;

import { useState } from "react";
import ContestHead from "../components/clan/ContestHead";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useApi } from "../context/ApiContext.jsx";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ContestPage = () => {
  const [popup, setPopup] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    message: "",
    noOfIssues: "",
    note: "",
    contestPrice: [{ 1: "" }, { 2: "" }, { 3: "" }],
    rules: "",
  });
  const api = useApi();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriceChange = (index, value) => {
    const updatedPrices = [...formData.contestPrice];
    const rank = Object.keys(updatedPrices[index])[0]; // Get the key (rank)
    updatedPrices[index] = { [rank]: value };
    setFormData({ ...formData, contestPrice: updatedPrices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        noOfIssues: Number(formData.noOfIssues),
        contestPrice: formData.contestPrice.map((obj) => {
          const key = Object.keys(obj)[0];
          return { [key]: Number(obj[key]) };
        }),
        adminId: user?._id,
      };

      const response = await api.post("/contest/create", payload);
      if (response.status == 201) {
        // console.log(response.data.contest);

        toast.success("Created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setFormData({
          name: "",
          date: "",
          message: "",
          noOfIssues: "",
          note: "",
          contestPrice: [{ 1: "" }, { 2: "" }, { 3: "" }],
          rules: "",
        });
        setTimeout(() => {
          setPopup((pre) => !pre);
          navigate(`/contest_description_page/${response.data.contest._id}`);
        }, 1500);
      }
    } catch (error) {
      console.error(error);
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

  return (
    <>
      <ToastContainer style={{ top: "100px" }} />
      {popup ? (
        <>
          <div className="max-w-lg mx-auto p-6 bg-gradient-to-tr from-teal-300 via-purple-400 to-blue-500 shadow-md rounded-lg my-10">
            <h2 className="text-xl font-semibold mb-4 text-center text-white">
              Create Contest
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contest Name */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contest Name"
                className="w-full outline-none p-2 border rounded-lg"
                required
              />

              {/* Date */}
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 outline-none border rounded-lg"
                required
              />

              {/* Message */}
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full p-2 outline-none border rounded-lg"
              />

              {/* No of Issues */}
              <input
                type="number"
                name="noOfIssues"
                value={formData.noOfIssues}
                onChange={handleChange}
                placeholder="No of Issues"
                className="w-full p-2 outline-none border rounded-lg"
              />

              {/* Note */}
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Note"
                className="w-full p-2 outline-none resize-none border rounded-lg"
              ></textarea>

              {/* Contest Price Inputs */}
              <div>
                <label className="font-semibold text-white">
                  Contest Prizes:
                </label>
                {formData.contestPrice.map((prize, index) => {
                  const rank = Object.keys(prize)[0]; // Get rank (1, 2, 3)
                  return (
                    <input
                      key={index}
                      type="number"
                      value={prize[rank]}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      placeholder={`Rank ${rank} Prize`}
                      className="w-full outline-none p-2 border rounded-lg my-2"
                    />
                  );
                })}
              </div>

              {/* Rules */}
              <textarea
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                placeholder="Rules"
                className="w-full p-2 border resize-none outline-none rounded-lg"
              ></textarea>

              {/* Submit Button */}
              <div className="w-full flex justify-center items-center gap-5 flex-wrap">
                <button
                  onClick={() => setPopup((pre) => !pre)}
                  className="w-1/3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancle
                </button>
                <button
                  type="submit"
                  className="w-1/3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create Contest
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="min-w-full h-screen flex flex-col gap-4">
          <ContestHead />

          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center px-3">
              <div className="w-full lg:w-2/3 bg-[#F9F9F9] p-6 rounded-lg shadow-lg">
                {/* Tab Navigation */}
                <div className="flex flex-col flex-wrap mb-6">
                  <div className="flex flex-wrap justify-between items-center md:w-4/5">
                    <NavLink
                      to="/contest_page"
                      end
                      className={({ isActive }) =>
                        `py-2 px-4 font-semibold rounded-full ${
                          isActive ? "bg-gray-200 text-black" : "text-gray-400"
                        }`
                      }
                    >
                      Past Contests
                    </NavLink>

                    <NavLink
                      to="/contest_page/my_contests"
                      className={({ isActive }) =>
                        `py-2 px-4 font-semibold rounded-full ${
                          isActive ? "bg-gray-200 text-black" : "text-gray-400"
                        }`
                      }
                    >
                      My Contests
                    </NavLink>
                    <NavLink
                      to="/contest_page/all_contests"
                      className={({ isActive }) =>
                        `py-2 px-4 font-semibold rounded-full ${
                          isActive ? "bg-gray-200 text-black" : "text-gray-400"
                        }`
                      }
                    >
                      All Contests
                    </NavLink>
                    {user?.isAdmin && (
                      <button
                        onClick={() => setPopup((pre) => !pre)}
                        className="py-2 px-4 font-semibold rounded-full text-white bg-gradient-to-tr from-teal-400 via-purple-500 to-blue-800"
                      >
                        Create Contest
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full ">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContestPage;

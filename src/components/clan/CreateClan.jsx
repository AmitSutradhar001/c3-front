import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiContext.jsx";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/userSlice.js";
const CreateClan = () => {
  const clanTypeArr = ["open", "close"];
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Congo (Congo-Kinshasa)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const clanLeader = user?.fullname;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const location = formData.get("location");

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
      <div className="flex mt-8 gap-4 mb-10 flex-col justify-center items-center w-full">
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
            <select
              id="location"
              name="location"
              className="w-full p-2 border rounded-md mb-4"
              required
            >
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <label
              htmlFor="clanType"
              className="block text-sm font-medium mb-1"
            >
              Clan Type
            </label>
            <select
              id="clanType"
              name="clanType"
              className="w-full p-2 border rounded-md mb-4"
              required
            >
              <option value="">Select a clan type</option>
              {clanTypeArr.map((clan, index) => (
                <option key={index} value={clan}>
                  {clan}
                </option>
              ))}
            </select>
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
      </div>
    </>
  );
};
export default CreateClan;

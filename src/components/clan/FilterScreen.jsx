import { useEffect, useRef, useState } from "react";
import { useApi } from "../../context/ApiContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupCard from "./GroupCard.jsx";

const FilterScreen = () => {
  const clanTypeArr = ["any", "open", "close", "invite only"];
  const countries = ["International",
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
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default country
  const [clanData, setClanData] = useState(null); // Default country
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [minimumMembers, setMinimumMembers] = useState(0);
  const [minimumSolvedIssues, setMinimumSolvedIssues] = useState(0);
  // Initialize with index 0 (first item in the array)
  const [index, setIndex] = useState(0);
  const dropdownRef = useRef(null);
  const api = useApi()

  // Handle country selection
  const handleSelect = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false); // Close dropdown after selecting
  };

  // Close dropdown if clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle decrement, loop back to the end if needed
  const handleDecrement = (e) => {
    e.preventDefault();
    setIndex((prevIndex) =>
      prevIndex === 0 ? clanTypeArr.length - 1 : prevIndex - 1
    );
  };

  // Handle increment, loop back to the start if needed
  const handleIncrement = (e) => {
    e.preventDefault();
    setIndex((prevIndex) =>
      prevIndex === clanTypeArr.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handleClick = async (e) => {
    e.preventDefault()
    try {
         const res = await api.post(
           "/clan/filter",
           {
             clanType:
               clanTypeArr[index] === "any" ? undefined : clanTypeArr[index],
             location:
               selectedCountry === "International"
                 ? undefined
                 : selectedCountry,
             solvedIssues: minimumSolvedIssues,
             minimumMembers,
           },
           {
             headers: {
               "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
             },
             withCredentials: true, // Required to send and receive cookies
           }
         );
      
      if (res.status == 200) {
        if (res.data.clans.length > 0) {
          setClanData(res.data.clans)
           toast.success("clans are here!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
        } else {
          setClanData(null)
           toast.info("No clan with these filters!", {
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
      }
      
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <>
      <ToastContainer style={{ top: "100px" }} />
      <div className="flex mt-8 gap-4 mb-10 flex-col justify-center items-center w-full">
        <div className="flex bg-[#F6F6F6] flex-col justify-center items-center w-full md:w-10/12 lg:w-8/12 border-[1px] border-purple-500 rounded-md px-8 gap-4 py-4">
          <form className="flex bg-[#F6F6F6] flex-col justify-center items-center w-full  px-8 gap-4 py-4">
            <div className="flex flex-col md:flex-row justify-between gap-2 items-center w-full">
              <div className="w-full flex justify-center items-center flex-wrap gap-4">
                {/* 1st div */}
                <div className="flex flex-col gap-2">
                  <p>Clan Type:</p>
                  <div className="flex justify-center items-center">
                    <button
                      className="py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
                      onClick={handleDecrement}
                    >
                      &#10094; {/* HTML entity for left arrow */}
                    </button>
                    <input
                      type="text"
                      value={clanTypeArr[index]} // Display the current value from the array
                      readOnly
                      className="w-48 lg:w-64 text-center border-0 outline-none p-2"
                    />
                    <button
                      className="py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
                      onClick={handleIncrement}
                    >
                      &#10095; {/* HTML entity for right arrow */}
                    </button>
                  </div>
                </div>
                {/* 2st div */}
                <div className="flex flex-col gap-2 relative">
                  <p>Clan Location:</p>
                  <div className="flex justify-center items-center">
                    <input
                      type="text"
                      value={selectedCountry}
                      readOnly
                      className="w-48 lg:w-64 text-center border-0 outline-none p-2 cursor-pointer"
                      onClick={() => setDropdownOpen(!dropdownOpen)} // Open dropdown when clicking input
                    />
                    <button
                      className="py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(!dropdownOpen);
                      }}
                    >
                      &#10095;
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-10 left-0 w-full max-h-60 bg-white border border-gray-300 shadow-lg rounded-lg overflow-y-auto z-10"
                    >
                      {countries.map((country, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSelect(country)}
                        >
                          {country}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-2 items-center w-full">
              <div className="w-full flex justify-center items-center flex-wrap gap-4">
                {/* 1st div */}
                <div className="flex flex-col gap-2">
                  <p>Solved Issues:</p>
                  <div className="flex justify-center items-center border-[1px] border-blue-600 rounded-lg">
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        setMinimumSolvedIssues(e.target.value);
                      }}
                      type="nnumber"
                      value={minimumSolvedIssues} // Display the current value from the array
                      className="w-48 lg:w-64 text-center border-0 outline-none p-2"
                    />
                  </div>
                </div>
                {/* 2st div */}
                <div className="flex flex-col gap-2 relative">
                  <p>Minimum Members:</p>
                  <div className="flex justify-center items-center border-[1px] border-blue-600 rounded-lg">
                    <input
                      type="number"
                      value={minimumMembers}
                      max={50}
                      className="w-48 lg:w-64 text-center border-0 outline-none p-2 cursor-pointer"
                      onChange={(e) => {
                        e.preventDefault();
                        setMinimumMembers(e.target.value);
                      }} // Open dropdown when clicking input
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleClick}
              type="submit"
              className="px-4 py-2 rounded-md border-[1px] text-white font-semibold bg-gradient-to-tr from-blue-500 :to-purple-600 border-teal-400 hover:border-purple-800 hover:bg-teal-400"
            >
              Submit
            </button>
          </form>
          {clanData &&
            clanData.map((item) => (
              <GroupCard key={item?._id} clanData={item} />
            ))}
        </div>
      </div>
    </>
  );
};
export default FilterScreen;

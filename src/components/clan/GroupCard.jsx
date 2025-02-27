import { Link } from "react-router-dom";

const GroupCard = ({ clanData }) => {  
  return (
    <div className="flex flex-wrap bg-[#F9F9F9] w-full items-center justify-center md:justify-between px-4 py-2 border rounded-lg shadow-md">
      {/* Group Icon or Image */}
      <div className="flex justify-center items-center">
        <img
          className="w-12 h-12 bg-gray-200 rounded-lg"
          src={clanData?.profileImage}
        />
        <div className="px-2">
          <h2 className="text-lg font-semibold">{clanData?.name}</h2>
          <p className="text-sm text-gray-500">{clanData?.clanType}</p>
        </div>
      </div>

      {/* Group Info */}

      <div className="flex w-auto items-end h-12">
        <Link to={`/clan/${clanData?._id}`} className="text-sm text-gray-400 ">
          Tap to view Details
        </Link>
      </div>
      {/* Member Info */}
      <div className="flex items-center ">
        <div className="text-right pr-3">
          <p className="text-sm text-gray-500">Members</p>
          <p className="text-sm">{clanData?.members.length}/50</p>
        </div>

        {/* Some Numeric Value */}
        <div className="border-l-[1px] border-gray-600 pl-4">
          <div className="flex items-center justify-center w-20 h-10 border-[1px] border-gray-500 rounded">
            <p>{clanData?.requiredSolvedIssues}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;

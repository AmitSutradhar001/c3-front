const StatusCard = ({ data, formattedDate }) => {
  return (
    <div className="w-72 border-[1px] border-black  bg-[#F9F9F9] rounded-lg p-4">
      {/* Header */}
      <div className="border-b-[1px] border-black flex justify-between items-center pb-2">
        <p className="text-lg font-semibold">Status</p>
        <p className="text-gray-500 text-sm">
          Completed{" "}
          <span className="inline-block w-2 h-2 bg-green-700 rounded-full"></span>
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-4 space-y-4">
        {/* First status */}
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-3">
            {/* Circle */}
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            {/* Vertical line */}
            <div className="w-0.5 h-12 bg-green-400"></div>
          </div>
          <div>
            <p className="font-semibold">Paid by {data?.clanName}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>

        {/* Second status */}
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-3">
            {/* Circle */}
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            {/* Vertical line */}
            <div className="w-0.5 h-12 bg-green-400"></div>
          </div>
          <div>
            <p className="font-semibold">Processed</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>

        {/* Third status */}
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-3">
            {/* Circle */}
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-0.5 h-12 bg-green-400"></div>
          </div>
          <div>
            <p className="font-semibold">Received by {data?.userName}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;

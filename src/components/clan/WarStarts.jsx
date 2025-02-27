const WarStats = ({ clanData }) => {
  return (
    <div className="bg-[#F6F6F6] w-full shadow-md rounded-lg p-4 flex flex-wrap justify-around items-center">
      <div className="flex flex-col items-center min-w-[150px] mb-4 md:mb-0">
        <h2 className="text-lg font-bold">War Stats</h2>
        <span>Friendly War</span>
      </div>

      <div className="flex flex-col justify-center items-center border-l-2 border-gray-300 min-w-[120px] mb-4 md:mb-0 md:border-l-2 md:border-gray-300 md:pl-4">
        <span className="font-semibold">Total Wars:</span>
        <span>
          {clanData?.warLosses + clanData?.warTies + clanData?.warWins}
        </span>
      </div>

      <div className="flex flex-col justify-center items-center border-l-2 border-gray-300 min-w-[120px] mb-4 md:mb-0 md:pl-4">
        <span className="font-semibold">Won:</span>
        <span>{clanData?.warWins}</span>
      </div>

      <div className="flex flex-col justify-center items-center border-l-2 border-gray-300 min-w-[120px] mb-4 md:mb-0 md:pl-4">
        <span className="font-semibold">Loss:</span>
        <span>{clanData?.warLosses}</span>
      </div>

      <div className="flex flex-col justify-center items-center border-l-2 border-gray-300 min-w-[120px] md:pl-4">
        <span className="font-semibold">Draw:</span>
        <span>{clanData?.warTies}</span>
      </div>
    </div>
  );
};

export default WarStats;

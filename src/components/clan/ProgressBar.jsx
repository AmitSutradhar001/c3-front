const ProgressBar = ({ current, total }) => {
  // Calculate the percentage of the progress
  const percentage = (current / total) * 100;

  return (
    <div className="max-w-52 mx-auto text-center">
      <div className="relative w-full bg-gray-300 h-1 rounded-lg overflow-hidden">
        {/* Filled part of the progress bar */}
        <div
          className="absolute top-0 left-0 h-full bg-black"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Numbers below the progress bar */}
      <p className="mt-2 text-black text-sm">
        {current}/{total}
      </p>
    </div>
  );
};

export default ProgressBar;

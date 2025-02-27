const Prize = ({contest}) => {
  return (
    <>
      <div className="bg-[#F9F9F9] p-5 rounded-lg flex flex-col gap-1">
        <h2 className="text-xl font-bold mb-4">Contest Prizes</h2>
        <div className="flex justify-between items-center font-semibold">
          <p>#1</p>
          <p>{contest?.contestPrice?.[0]?.["1"] ?? "Default Value"}</p>
        </div>
        <div className="flex justify-between items-center font-semibold">
          <p>#2</p>
          <p>{contest?.contestPrice?.[1]?.["2"] ?? "Default Value"}</p>
        </div>
        <div className="flex justify-between items-center font-semibold">
          <p>#3</p>
          <p>{contest?.contestPrice?.[2]?.["3"] ?? "Default Value"}</p>
        </div>
      </div>
    </>
  );
};
export default Prize;

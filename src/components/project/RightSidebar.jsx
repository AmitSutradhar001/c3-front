import Calendar from "./calendar/Calendar.jsx";
import DoughnutChart from "./chart/DoughnutChart";
import Companies from "./Companies.jsx";
import "../../css/components/project/RightSidebar.css";

const RightSidebar = () => {
  return (
    <>
      <div className="rs-outer">
        <DoughnutChart />
        <Calendar />
        <Companies text={"Top Companies"} />
      </div>
    </>
  );
};

export default RightSidebar;

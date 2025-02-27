import SmallBtn from "./SmallBtn";
import SmallArrow from "/smallArrow.svg";
import "../../css/components/contributor/TopBar.css";

const TopBar = () => {
  return (
    <>
      <div className="to-outer">
        <div className="to-inner">
          <div className="to-admin">Admin</div>
          <div className="to-admin">Contributor</div>
        </div>
        <div className="to-inner-div">
          <div className="to-sm-div">
            <SmallBtn text={"Tags"} svg={SmallArrow} />
            <SmallBtn text={"Difficulty"} svg={SmallArrow} />
            <SmallBtn text={"Status"} svg={SmallArrow} />
          </div>

          <div className="to-img-input-div">
            <img src="/project/search-normal.svg" />
            <input
              type="text"
              placeholder="Enter issue name"
              className="to-input"
            />
          </div>
          <div>
            <button type="" className="to-btn">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;

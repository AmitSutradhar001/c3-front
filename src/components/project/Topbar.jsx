// responsivness done

import Button from "./Button";
import "../../css/components/project/Topbar.css";

const Topbar = () => {
  return (
    <>
      <div className="tb-outer">
        {/* <div className="tb-inner">
          <div className="tb-admin">Admin</div>
          <div className="tb-admin">Contributor</div>
        </div> */}
        <div className="tb-input-outer">
          <div className="tb-input-inner">
            <img src="/project/search-normal.svg" />
            <input
              className="tb-input"
              type="text"
              placeholder="Enter issue name"
            />
          </div>
          <div>
            <Button text={"Search"} type={""} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;

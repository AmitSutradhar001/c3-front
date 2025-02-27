import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../css/components/apply/OpenIssue.css";
import ApplyBox from "./ApplyBox";

const OpenIssue = ({ isOn, issue, onApplyClick }) => {
  const { git } = useSelector((state) => state.gitAndCollabProject);
  return (
    <>
      {isOn && <ApplyBox toggleApplyBox={onApplyClick} issue={issue} />}
      <div className="op-outer">
        <div className="op-inner">
          <h2 className="op-h2">
            {issue.title ? issue.title : "Map Relocation"}
          </h2>
          <p className="op-p">
            {issue.content
              ? issue.content
              : "Coordinates alignment in x and y part. Nulla ac ultrices sed ornare molestie in eget in. Aliquet duis purus libero enim aliquam ultricies dui scelerisque. Vitae pharetra non praesent vulputate ultrices."}
          </p>
          <div>
            <h2 className="op-h2">Required Skills</h2>
            <div className="op-s-out-div">
              <div className="op-s-inn-div">
                <p className="op-s-inner-p">UIDesigner</p>
                <p className="op-s-inner-p">UIDesigner</p>
              </div>
              <div className="op-last">
                <Link
                  className="op-link-btn"
                  target={git ? "_blank" : ""}
                  to={git ? issue.html_url : ""}
                  onClick={() => !git && onApplyClick()} // Toggle ApplyBox when clicking "Apply"
                >
                  {git ? "Issue" : "Apply"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenIssue;

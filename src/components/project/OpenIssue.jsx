import save from "/apply/save.svg";
import share from "/apply/share.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../../redux/gitAndCollabProject.js";
import "../../css/components/project/OpenIssue.css";

const OpenIssue = ({ project }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { git } = useSelector((state) => state.gitAndCollabProject);
  const handleBtnClick = () => {
    dispatch(set(project));
    if (!user.isAdmin) {
      if (git) {
        navigate(`/projects/contributor/git/${project.id}`);
      } else {
        navigate(`/projects/contributor/collab/${project._id}`);
      }
    } else {
      navigate(`/projects/admin/${project._id}`);
    }
  };

  return (
    <div className="oi-outer">
      <div className="oi-inner">
        <div className="oi-f-inner">
          <img src={project?.postImage} className="oi-s-inner" />
          <div>
            <h2 className="oi-h2">{project.title}</h2>
            <h3 className="oi-h3">{project.content}</h3>
          </div>
        </div>
        <div className="oi-s-img">
          <img src={share} alt="share" />
        </div>
      </div>
      <div className="oi-img-outer-div">
        <div className="oi-img-inner-div">
          <img src="/apply/brifecase-tick.svg" alt="" />
          <div>
            <h2 className="oi-img-h2">Rating</h2>
            <h3 className="oi-img-h3">
              {project.rating ? project.rating : "300-400"}
            </h3>
          </div>
        </div>
        <div className="oi-img-inner-div">
          <img src="/apply/empty-wallet.svg" alt="" />
          <div>
            <h2 className="oi-img-h2">Average Price per issue</h2>
            <h2 className="oi-img-h3">
              ₹{project.price ? project.price : "500"}
            </h2>
          </div>
        </div>
        <div className="oi-img-inner-div">
          <img src="/apply/menu-board.svg" alt="" />
          <div>
            <h2 className="oi-img-h2">Completion Time</h2>
            <h2 className="oi-img-h3">
              {new Date(project?.endDate).toLocaleDateString("en-GB")}
            </h2>
          </div>
        </div>
      </div>
      <div className="oi-ui-div">
        {project.tech_stack.map((item, index) => (
          <p key={index} className="oi-ui-p">
            {item}
          </p>
        ))}
      </div>
      <div className="oi-btn-div">
        <img src={save} alt="save" />
        <div className="oi-btn-inner-div">
          <button
            onClick={handleBtnClick}
            type="button"
            className="oi-btn-inner-f-btn"
          >
            Details
          </button>
          {/* {user.is_contributor && (
            <button
              disabled={applyed}
              onClick={handleApplyClick}
              type="text"
              className={
                !applyed ? "oi-btn-inner-s-a-btn" : "oi-btn-inner-s-btn"
              }
            >
              {!applyed ? "Apply now" : "Applyed"}
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default OpenIssue;

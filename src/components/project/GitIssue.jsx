import save from "/apply/save.svg";
import share from "/apply/share.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../../redux/gitAndCollabProject.js";
import "../../css/components/project/OpenIssue.css";

const GitIssue = ({ project }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { git } = useSelector((state) => state.gitAndCollabProject);
  const handleBtnClick = () => {
    dispatch(set(project));
    if (!user.IsAdmin) {
      if (git) {
        navigate(`/projects/contributor/git/${project.id}`);
      } else {
        navigate(`/projects/contributor/collab/${project.id}`);
      }
    } else {
      navigate(`/projects/admin/collab/${project.id}`);
    }
  };

  return (
    <div className="oi-outer">
      <div className="oi-inner">
        <div className="oi-f-inner">
          <div className="oi-s-inner"></div>
          <div>
            <h2 className="oi-h2">{project.name}</h2>
            <h3 className="oi-h3">{project.full_name}</h3>
          </div>
        </div>
        <div className="oi-s-img">
          <img src={share} alt="share" />
        </div>
      </div>
      <p className="oi-p-1">{project.description}</p>
      <div className="oi-issui-div">
        {project.topics.map((item, index) => (
          <p key={index} className="oi-ui-p">
            #{item}
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
        </div>
      </div>
    </div>
  );
};

export default GitIssue;

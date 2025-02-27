import "../../../css/components/apply/applyed/OpenIssue.css";

const OpenIssue = ({ apply }) => {
  // contributor_id: user.user_id,
  //       project_id: id,
  //       proposal: textAreaValue,
  //       title: title,
  return (
    <>
      <div className="ao-outer ">
        <div className="ao-inner">
          <h2 className="ao-h2">{apply ? apply.title : "Issue"} </h2>
          <p className="ao-p">
            {apply
              ? apply.content
              : "Coordinates alignment in x and y part.Nulla ac ultrices sed ornare molestie in eget in. Aliquet duis purus libero enim aliquam ultricies dui scelerisque. Vitae pharetra non praesent vulputate ultrices."}
          </p>
          <div className="ao-m">
            <div className="ao-m-middle">
              <div className="ao-m-last">
                <p className="ao-m-p">UIDesigner</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ao-last">
          <img src="/profile-circle.svg" className="ao-last-img" />
          <p className="ao-last-p">View Profile</p>
        </div>
      </div>
    </>
  );
};

export default OpenIssue;

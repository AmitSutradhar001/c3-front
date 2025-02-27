import "../../css/components/Explore/Contributions.css";

const Contributions = ({ item }) => {
  return (
    <div className="c-outer">
        <img className="c-pro" src={item?.profilePicture} />
      <div className="c-inner">
        <h2 className="c-inner-h2">{item ? item.fullname : "Ashish Singh"}</h2>
        <h3 className="c-inner-h3">Justo pellentesque turpis etiam egestas.</h3>
        <p className="c-inner-p">
          Tortor nibh integer mi mauris dolor aliquam gravida est. Cursus sed
          rutrum pellentesque mattis sagittis sed nunc. Neque convallis magna
          feugiat .
        </p>
        <div className="c-btn">
          <div>Google</div>
          <div>Google</div>
          <div>Google</div>
        </div>
      </div>
      <div className="c-date">Posted on Monday 12 Jan 2024</div>
    </div>
  );
};

export default Contributions;

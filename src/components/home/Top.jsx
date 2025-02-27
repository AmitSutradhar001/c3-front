import "../../css/components/home/Top.css";

const Top = () => {
  return (
    <>
      <div
        style={{ backgroundImage: "url('/home/homeBG.png')" }}
        className="outer"
      >
        <div className="inner">
          <div className="s-inner">
            <h2 className="h2-top">Arcu amet scelerisque aliquam</h2>
            <div className="h2-inner">
              <p className="p-tag">
                Pellentesque integer integer fusce sed nunc tortor venenatis
              </p>
              <p className="p-tag">
                orci mi. Nec sagittis tincidunt urna augue senectus.
              </p>
            </div>
          </div>
          <div className="img-div">
            <img
              src="/home/homeLeftImg.svg"
              alt="home left image "
              className="img-t"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Top;

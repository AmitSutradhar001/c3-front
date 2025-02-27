import Card from "../components/home/Card.jsx";
import Carousel from "../components/home/Carousel";
import Faq from "../components/home/Faq";
import { Footer } from "../components/home/Footer.jsx";
import Top from "../components/home/Top";
import { performers2, reviews } from "../data/dummy.js";
import "../css/pages/Home.css";

const Home = () => {
  return (
    <>
      <div className="box">
        {/* Top */}
        <Top />
        {/* Collab */}
        <div className="collab">
          <h2 className="h2">What You can do on Collab</h2>
          <div className="collab-inner">
            <Card
              name={"No Entry Barrier"}
              description={
                "A person even with no experience can easily start. Grow as you create."
              }
            />
            <Card
              name={"Fun"}
              description={
                "Introduction to unique feature called clans. Add a competitive angle to the whole process."
              }
            />
            <Card
              name={"Networking"}
              description={
                "Focus on high quality networking through specialised features. Reduced time to assemble a team"
              }
            />
          </div>
        </div>
        {/* <Performers /> */}
        <div className="performers">
          <h2 className="h2">Top Performers</h2>
          <div className="performers-inner">
            <button className="admin-contributor-btn">Admin</button>
            <button className="admin-contributor-btn">Contributor</button>
          </div>
        </div>
        <div className="carousel-outer">
          <Carousel cards={performers2} />
        </div>
        {/* Members */}
        <div className="members">
          <h2 className="h2">Members Affiliated with </h2>
          <div className="members-div"></div>
        </div>
        <div className="faq">
          <Faq />
        </div>

        {/* Reviews */}
        <div className="reviews">
          <h2 className="h2">Top Reviews</h2>
        </div>
        <div className="carousel-outer">
          <Carousel cards={reviews} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;

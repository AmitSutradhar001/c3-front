import { ContributionCalendar } from "react-contribution-calendar";
import { profileData } from "../data/dummy.js";
import Sidebar from "../components/profile/Sidebar.jsx";
import "../css/pages/Profile.css";

const Profile = () => {
  return (
    <>
      <div className="pr-out">
        <Sidebar />
        <div className="pr-in">
          {/*Badges */}
          <div className="pr-in-2">
            <div className="pr-in-3">
              <div className="pr-in-4">
                <h2 className="pr-in-4-h2">Badges</h2>
                <img src="/profile/rarr.svg" />
              </div>
              <div className="pr-in-5">
                <img src="/profile/mb.png" />
                <img src="/profile/mb.png" />
                <img src="/profile/mb.png" />
              </div>
              <h3 className="pr-in-5-h3">Most Recent Badge </h3>
              <h3 className="pr-in-5-h3">50 Days Badge 2023</h3>
            </div>
          </div>
          {/*contribution calendar */}
          <div className="pr-c-c">
            <div className="pr-c-c-1">
              <div className="pr-c-c-2">
                <p>300 Submissions in 2023</p>
                <img src="/profile/info.svg" />
              </div>
              <div className="pr-c-c-3">
                <p>Total Active days:73 </p>
                <p>Max Streak:32</p>
                <div className="pr-c-c-4">
                  <p className="pr-c-c-4-p">2024</p>
                  <img src="/profile/dr.svg" />
                </div>
              </div>
            </div>
            <ContributionCalendar
              data={profileData}
              start="2024-01-01"
              end="2024-12-31"
              daysOfTheWeek={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
              textColor="#1F2328"
              startsOnSunday={true}
              includeBoundary={true}
              theme="sky"
              cx={12}
              cy={12}
              cr={2}
              onCellClick={(e, data) => console.log(data)}
              scroll={false}
              style={{ wigth: "200px" }}
            />
          </div>
          {/*solved issues */}
          <div className="pr-s">
            <div className="pr-s-in">
              <p>Solved Issues</p>
              <div className="pr-s-in-2">
                <p>View all Submissions</p>
                <img src="/profile/rarrow.svg" className="pr-s-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

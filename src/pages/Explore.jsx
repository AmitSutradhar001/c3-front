// responsivness done
import { useEffect, useState } from "react";
import Contributions from "../components/Explore/Contributions";
import Companies from "../components/project/Companies";
import "../css/pages/Explore.css";
import { useApi } from "../context/ApiContext";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../components/Loading";

const Explore = () => {
  const [users, setUsers] = useState([]); // State to store the fetched user data
  const [loading, setLoading] = useState(true);
  const api = useApi();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/user/get-all-users', {
          headers: {
            "Content-Type": import.meta.env.VITE_EXPRESS_HEADER,
          },
        });
      console.log(response);
      
        if(response.status===200){
          let contributors = response.data.users
          .filter((user) => !user.isAdmin
        )
          .reverse();
        let admins = response.data.users.filter((user) => user.isAdmin).reverse();       
        // Further filter the last 2 contributors and admins
        const lastTwoContributors = contributors.slice(0, 2); // Taking first two after reversing
        const lastTwoAdmins = admins.slice(0, 2); // Taking first two after reversing

        // Combine the filtered users if you want to use both
        setUsers({ contributors: lastTwoContributors, admins: lastTwoAdmins });

        }
    
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      }
    };

    fetchUsers(); // Call the fetch function inside useEffect
  }, []); // Empty dependency array to run the effect only once on mount

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="exp-outer ">
      <ToastContainer style={{ top: "100px" }} />
      <div className=" exp-inner ">
        <h2 className="exp-h2">Our Partners</h2>
        <div className="exp-pro-div">
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
          <div className="exp-pro"></div>
        </div>
      </div>
      <div className="exp-out">
        {users.contributors ? (
          <>
            <div className="w-9/12">
              <h2 className="exp-con-h2">Recent Contributions</h2>
              <div className="exp-con-div">
                {users && users ? (
                  users.contributors.map((item, index) => (
                    <Contributions key={index} item={item} />
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="exp-com-div">
          <Companies text={"Trending Topics"} />
        </div>
      </div>
      <div className="exp-admin-div">
        <h2 className="exp-admin-h2">Recent Admin posts</h2>
        <div className="exp-con-div">
          {users ? (
            users.admins.map((item, index) => (
              <Contributions key={index} item={item} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;

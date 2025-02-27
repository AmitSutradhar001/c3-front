import "../../css/components/chat/UserList.css";

const UserList = ({ users, onUserClick, selectedUser }) => {
  return (
    <div className="uls-outer">
      <div className="uls-inn">
        <h2 className="uls-h2">Contact</h2>
        <div className="uls-inner-div">
          {users.map((user, index) => (
            <div
              key={user.id}
              onClick={() => onUserClick(user)}
              className="uls-inner-2"
            >
              <div className="uls-inn-outer">
                <div className="uls-inn-pro"></div>
                <div className="uls-inn-pro-out">
                  <h2 className="uls-inn-pro-h2">{user.name}</h2>
                  <h3 className="uls-inn-pro-h3">{user.lastMessage}</h3>
                </div>
              </div>
              <p>{user.lastSeen}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;

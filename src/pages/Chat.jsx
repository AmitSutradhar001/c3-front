import { useState } from "react";
import UserList from "../components/chat/UserList.jsx";
import ChatWindow from "../components/chat/ChatWindow.jsx";
import { users } from "../data/dummy.js";
import "../css/pages/Chat.css";

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUsersList, setShowUsersList] = useState(true);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUsersList(false);
  };

  const handleBackClick = () => {
    setShowUsersList(true);
  };

  return (
    <div className="ct-out">
      <div className="ct-in-1">
        <div className="ct-in-2">
          <h2 className="ct-h2">Messaging</h2>
          <div className="ct-in-3">
            <img src="/project/search-normal.svg" alt="Search Icon" />
            <input placeholder="Enter Issue Name!" className="ct-input" />
          </div>
        </div>
        <div className="ct-in-4">
          <div className="ct-in-5">
            <div
              className={`ct-in-6 ${
                showUsersList ? "ct-in-6-ac " : "ct-in-6-ia"
              } md:block`}
            >
              <UserList
                users={users}
                onUserClick={handleUserClick}
                selectedUser={selectedUser}
              />
            </div>
            <div
              className={`ct-in-7 ${
                showUsersList ? "ct-in-6-ia" : "ct-in-6-ac"
              }`}
            >
              {selectedUser && (
                <ChatWindow user={selectedUser} onBackClick={handleBackClick} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

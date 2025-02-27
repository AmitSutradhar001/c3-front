import "../../css/components/chat/ChatWindow.css";

const ChatWindow = ({ user, onBackClick }) => {
  const messages = user.messages;

  return (
    <div className="ch-outer">
      <div className="ch-inner">
        <div className="ch-inn-2">
          <div className="ch-pro-div"></div>
          <div>
            <h2 className="ch-pro-h2">{user.name}</h2>
            <p className="ch-pro-p">Last seen today at {user.lastSeen}</p>
          </div>
        </div>
        <button className="chh-pro-btn" onClick={onBackClick}>
          Back
        </button>
      </div>
      <div className="ch-msg-div">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`ch-msg-inn ${
              msg.sender === "Me" ? "ch-msg-me" : "ch-msg-u"
            }`}
          >
            {msg.sender !== "Me" ? (
              <>
                <div className="ch-msg-pro"></div>
                <div className="ch-msg-pro-inn">
                  <h3 className="">{msg.time}</h3>
                  <div className="ch-msg-pro-div-outer">{msg.text}</div>
                </div>
              </>
            ) : (
              <>
                <div className="ch-msg-out">
                  <h3 className="">{msg.time}</h3>
                  <div className="ch-msg-in-3">{msg.text}</div>
                </div>
                <div className="ch-in-pro"></div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="ch-msg-inp">
        <div className="ch-msg-inp-in">
          <input
            type="text"
            className="ch-last-in"
            placeholder="Type a message..."
          />
          <button className="ch-last-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

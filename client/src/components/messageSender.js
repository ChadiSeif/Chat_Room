import { Avatar } from "@mui/material/";
const MessageSender = ({ msg }) => {
  return (
    <>
      <div className="messageText" key={Math.random()} id="sender">
        {msg.message}
        <Avatar
          sx={{
            width: 15,
            height: 15,
            fontSize: "10px",
            marginLeft: "10px",
          }}
        >
          {msg.username.substr(0, 2)}
        </Avatar>
      </div>
      <div key={Math.random()} id="senderTime">
        {new Date(msg.sent_at).getHours() +
          ":" +
          new Date(msg.sent_at).getMinutes()}
      </div>
    </>
  );
};
export default MessageSender;

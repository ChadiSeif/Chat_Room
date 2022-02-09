import { Avatar } from "@mui/material/";

const MessageReceiver = ({ msg }) => {
  return (
    <>
      <div className="messageText" key={Math.random()} id="receiver">
        <Avatar
          sx={{
            width: 15,
            height: 15,
            fontSize: "10px",
            marginRight: "10px",
          }}
        >
          {msg.username.substr(0, 2)}
        </Avatar>
        {msg.message}
      </div>
      <div key={Math.random()} id="receiverTime">
        {new Date(msg.sent_at).getHours() +
          ":" +
          new Date(msg.sent_at).getMinutes()}
      </div>
    </>
  );
};
export default MessageReceiver;

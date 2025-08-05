import { ClientMessagesTypes, type TClientMessage } from "@app-types/message";
import { Fragment, type ReactElement } from "react";
import "./style.css";

interface MessageProps {
  message: TClientMessage;
}

const Message = ({ message }: MessageProps): ReactElement => {
  return (
        <div className={`message ${message.isMine ? "mine" : "other"}`}>
          <div className="message-text secondary-text">{message.text}</div>
          <div className="message-time meta-text">{message.time}</div>
        </div>
  );
};

export default Message;

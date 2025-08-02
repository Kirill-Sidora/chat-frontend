import type { IMessage } from "@app-types/message";
import "./style.css";

interface MessageProps {
    message: IMessage;
}

export default function Message({ message }: MessageProps) {
    return (
        <div className={`message ${message.isMine ? "mine" : "other"}`}>
            <div className="message-text secondary-text">{message.text}</div>
            <div className="message-time meta-text">{message.time}</div>
        </div>
    );
}

import type { ReactElement } from "react";
import "./style.css";

export interface IMessageInputProps {
    message: string;
    setMessage: (message: string) => void;
    onSubmit: () => void;
}

const MessageInput = ({
    message,
    setMessage,
    onSubmit,
}: IMessageInputProps): ReactElement => {
    return (
        <textarea
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="message-input"
            rows={1}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit();
                }
            }}
        />
    );
};

export default MessageInput;

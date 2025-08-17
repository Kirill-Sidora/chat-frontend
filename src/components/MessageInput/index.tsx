import { type ChangeEvent, type ReactElement, type KeyboardEvent, Dispatch, SetStateAction } from "react";
import "./style.css";

export interface IMessageInputProps {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
    onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const MessageInput = ({
    message,
    setMessage,
    onKeyDown,
}: IMessageInputProps): ReactElement => {
    const onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setMessage(event.target.value);
    };

    return (
        <textarea
            autoFocus
            value={message}
            onChange={onChange}
            placeholder="Message"
            className="message-input secondary-text"
            rows={1}
            onKeyDown={onKeyDown}
        />
    );
};

export default MessageInput;
import IconButton from "@components/IconButton";
import MessageInput from "@components/MessageInput";
import { useState, type ReactElement } from "react";
import { IconIds } from "@utils/constants";
import "./style.css";

interface IMessageComposerProps {
    onSend: (message: string) => void;
}

const MessageComposer = ({ onSend }: IMessageComposerProps): ReactElement => {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div className="message-composer-container">
            <IconButton
                iconSrc={IconIds.PAPERCLIP_ICON}
                onClick={() => {}}
                height="24px"
            />
            <MessageInput
                message={message}
                setMessage={setMessage}
                onSubmit={handleSubmit}
            />
            <IconButton
                iconSrc={IconIds.STICKERS_ICON}
                onClick={() => {}}
                height="24px"
            />
            <IconButton
                iconSrc={!message.trim() ? IconIds.MICRO_ICON : IconIds.SENDING_BUTTON_ICON}
                onClick={handleSubmit}
                disabled={!message.trim()}
                variant="send"
                isActive = {!message.trim()}
            />
        </div>
    );
}

export default MessageComposer;
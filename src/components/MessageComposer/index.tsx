import IconButton from "@components/IconButton";
import MessageInput from "@components/MessageInput";
import sendingButton from "@assets/icons/sending-button-icon.svg";
import microIconIconSrc from "@assets/icons/micro-icon-disabled.svg";
import { IconIds } from "@utils/constants";
import { useState } from "react";
import "./style.css";

interface ChatFooterProps {
    onSend: (message: string) => void;
}

export default function ChatFooter({ onSend }: ChatFooterProps) {
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
                iconSrc={!message.trim() ? microIconIconSrc : sendingButton}
                rawSrc
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="send-icon-button"
                variant="send"
            />
        </div>
    );
}

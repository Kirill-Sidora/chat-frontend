import IconButton from "@components/IconButton";
import sendingButton from "@assets/icons/sending-button-icon.svg";
import microIconIconSrc from "@assets/icons/micro-icon-disabled.svg";
import { type KeyboardEvent } from "react";
import { IconIds } from "@utils/constants";
import { useState } from "react";
import "./style.css";

interface MessageInputProps {
    onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
    const [message, setMessage] = useState("");

    const isValidMessage = (msg: string): boolean => {
        return /\S/.test(msg);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isValidMessage(message)) {
            onSend(message);
            setMessage("");
        }
    };

    const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            handleSubmit(event);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            <IconButton iconSrc={IconIds.PAPERCLIP_ICON} onClick={() => {}} height="24px"/>
            <div className="input-container">
                <textarea
                    autoFocus
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="message-input secondary-text"
                    rows={1}
                    onKeyDown={handleTextareaKeyDown}
                />
            </div>
            <IconButton
                iconSrc={IconIds.STICKERS_ICON}
                onClick={() => {}}
                height="24px"
            />
            <button
                type="submit"
                className="send-button"
                disabled={!isValidMessage(message)}
            >
                <img src={isValidMessage(message) ? sendingButton : microIconIconSrc} />
            </button>
        </form>
    );
}
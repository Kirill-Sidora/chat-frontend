import IconButton from "@components/IconButton";
import sendingButton from "@assets/icons/sending-button-icon.svg";
import microIconIconSrc from "@assets/icons/micro-icon-disabled.svg";
import { IconIds } from "@utils/constants";
import { useState } from "react";
import type { KeyboardEvent } from "react"; // Явный импорт типа
import "./style.css";

interface MessageInputProps {
    onSend: (message: string) => void;
}

const handleSubmit = (
    e: React.FormEvent,
    message: string,
    { onSend }: MessageInputProps, 
    setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
    e.preventDefault();
    if (message.trim()) {
        onSend(message);
        setMessage("");
    }
};

export default function MessageInput({ onSend }: MessageInputProps) {
    const [message, setMessage] = useState("");

    const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e, message, { onSend }, setMessage);
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, message, { onSend }, setMessage)} className="message-input-container">
            <IconButton iconSrc={IconIds.PAPERCLIP_ICON} onClick={() => {}} height="24px"/>
            <div className="input-container">
                <textarea
                    autoFocus
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="message-input"
                    rows={1}
                    onKeyDown={handleTextareaKeyDown}
                />
            </div>
            <IconButton iconSrc={IconIds.STICKERS_ICON} onClick={() => {}} height="24px"/>
            <button
                type="submit"
                className="send-button"
                disabled={!message.trim()}
            >
                <img src={message.trim() ? sendingButton : microIconIconSrc} />
            </button>
        </form>
    );
}
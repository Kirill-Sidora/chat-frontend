import Message from "@components/Message";
import MessageComposer from "@components/MessageComposer";
import ParticipantsPanel from "@components/ParticipantsPanel";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useRef, useEffect, type ReactElement } from "react";
import type { TClientMessage } from "@app-types/message";
import "./style.css";

const MessagePage = (): ReactElement => {
    const { messages, messageHandlersConfig } = useChatDataContext();
    const { sendMessage } = useWebSocket(messageHandlersConfig);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        const container = document.querySelector(".messages-container");
        if (!container) return;

        const images = container.querySelectorAll("img");

        if (images.length === 0) {
            scrollToBottom();
            return;
        }

        images.forEach((img) => {
            if (img.complete) {
                scrollToBottom();
            } else {
                img.onload = scrollToBottom;
                img.onerror = scrollToBottom;
            }
        });
    }, [messages]);

    return (
        <div className="chat-page">
            <header className="chat-header">
                <img
                    src="src/assets/images/user-icon.png"
                    className="user-icon"
                />
            </header>
            <ParticipantsPanel />
            <div className="messages-container secondary-text">
                {messages.map((clientMessageData: TClientMessage) => (
                    <Message
                        key={clientMessageData.id}
                        message={clientMessageData}
                    />
                ))}
                <div className="end-pointer" ref={messagesEndRef} />
            </div>
            <MessageComposer onSendMessage={sendMessage} />
        </div>
    );
};

export default MessagePage;

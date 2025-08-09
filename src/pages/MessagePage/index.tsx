import Message from "@components/Message";
import MessageComposer from "@components/MessageComposer";
import ParticipantsPanel from "@components/ParticipantsPanel";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { useRef, useEffect, type ReactElement } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import type { TClientMessage } from "@app-types/message";

const MessagePage = (): ReactElement => {
    const { secondUsername, messages, messageHandlersConfig } =
        useChatDataContext();
    const { sendTextMessage, sendAudioMessage, sendFileMessage } = useWebSocket(
        messageHandlersConfig
    );

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-page">
            <header className="chat-header">
                <Link to="/" className="chat-back-button secondary-text">
                    ← Chats
                </Link>
                <div className="second-user-name-title primary-text">
                    {secondUsername ? secondUsername : "now you're alone"}
                </div>
                <img
                    src="src/assets/images/user-icon.png"
                    className="user-icon"
                />
            </header>
            <ParticipantsPanel />
            <div className="messages-container secondary-text">
                {messages.map((clientMessageData: TClientMessage) => (
                    <Message key={clientMessageData.id} message={clientMessageData} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <MessageComposer
                onTextSend={sendTextMessage}
                onFileSend={sendFileMessage}
                onAudioSend={sendAudioMessage}
            />
        </div>
    );
};

export default MessagePage;

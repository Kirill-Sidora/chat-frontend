import Message from "@components/Message";
import ParticipantsPanel from "@components/ParticipantsPanel";
import MessageComposer from "@components/MessageComposer";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { useChatData } from "@hooks/useChatData/useChatData";
import { useRef, useEffect, type ReactElement } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const MessagePage = (): ReactElement => {
    const { secondUsername, messages, messageHandlersConfig } = useChatData();
    const { sendMessage } = useWebSocket(messageHandlersConfig);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = (text: string) => {
        sendMessage(text);
    };

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
                {messages.map((msg) => (
                    <Message key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <MessageComposer onSend={handleSendMessage} />
        </div>
    );
};

export default MessagePage;

import Message from "@components/Message";
import MessageComposer from "@components/MessageComposer";
import { useRef, useEffect, type ReactElement } from "react";
import { useChatData } from "@hooks/useChatData/useChatData";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const MessagePage = (): ReactElement => {
    const { secondUsername, messages, messageHandlersConfig } = useChatData();
    const { sendMessage, sendNotification, isConnected } = useWebSocket(
        messageHandlersConfig
    );
    const location = useLocation();

    const isChatPage = location.pathname === "/chat";
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isConnected || !isChatPage) return;
        sendNotification("USER_JOINED");
        return () => {
            if (isConnected) {
                sendNotification("USER_LEFT");
            }
        };
    }, [isConnected, isChatPage]);

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

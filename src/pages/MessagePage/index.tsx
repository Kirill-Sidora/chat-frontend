import Message from "@components/Message";
import MessageComposer from "@components/MessageComposer";
import MessagePageHeader from "@components/MessagePageHeader";
import ParticipantsPanel from "@components/ParticipantsPanel";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useRef, useEffect, type ReactElement } from "react";
import { ClientMessagesTypes, ITextMessage, type TClientMessage } from "@app-types/message";
import "./style.css";
import { getFormattedTime, getRandomId } from "@utils/constants";
import { MessagesForServerTypes } from "@app-types/serverMessages";


const MessagePage = (): ReactElement => {
    const { messages, setMessages, messageHandlersConfig } = useChatDataContext();
    const { sendMessage } = useWebSocket(messageHandlersConfig);

    const handleMessageSend = (text: string): void => {
        if (!text.trim()) return;

        console.log("Intercepted message", text);

        const username = localStorage.getItem("nickName") || "Unknown";
        const timestamp = Date.now();

        const sentMessage: ITextMessage = {
            id: getRandomId(),
            type: ClientMessagesTypes.TEXT,
            time: getFormattedTime(timestamp), 
            isMine: true,
            sender: username,
            text: text
        };

        setMessages((previousMessages: TClientMessage[]) => [
            ...previousMessages,
            sentMessage
        ]);

        const type = MessagesForServerTypes.TEXT_MESSAGE;
        const data = text;
        
        sendMessage(type, data);
    };

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
            <MessagePageHeader />

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
            <MessageComposer onSendMessage={handleMessageSend} />
        </div>
    );
};

export default MessagePage;
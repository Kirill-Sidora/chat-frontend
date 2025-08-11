import Message from "@components/Message";
import MessageComposer from "@components/MessageComposer";
import MessagePageLayout from "@Layout/MessagePageLayout";
import ParticipantsPanel from "@components/ParticipantsPanel";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useRef, useEffect, type ReactElement } from "react";
import "./style.css";
import type { TClientMessage } from "@app-types/message";

const MessagePage = (): ReactElement => {
    const { messages, messageHandlersConfig } = useChatDataContext();
    const { sendTextMessage, sendAudioMessage, sendFileMessage } = useWebSocket(
        messageHandlersConfig
    );

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <MessagePageLayout>
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
                <MessageComposer
                    onTextSend={sendTextMessage}
                    onFileSend={sendFileMessage}
                    onAudioSend={sendAudioMessage}
                />
            </div>
        </MessagePageLayout>
    );
};

export default MessagePage;

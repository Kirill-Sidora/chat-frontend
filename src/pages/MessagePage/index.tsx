import Message from "@components/Message";
import MessageComposer from "@components/MessageComposer";
import MessagePageHeader from "@components/MessagePageHeader";
import ParticipantsPanel from "@components/ParticipantsPanel";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useRef, useEffect, type ReactElement } from "react";
import type { TClientMessage } from "@app-types/message";
import "./style.css";

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

            <MessageComposer
                onTextSend={sendTextMessage}
                onFileSend={sendFileMessage}
                onAudioSend={sendAudioMessage}
            />
        </div>
    );
};

export default MessagePage;

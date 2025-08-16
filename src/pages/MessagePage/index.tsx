import Message from "@components/Message";
import MessageComposer from "@components/MessageComposer";
import MessagePageHeader from "@components/MessagePageHeader";
import ParticipantsPanel from "@components/ParticipantsPanel";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useRef, useEffect, type ReactElement } from "react";
import { type TClientMessage } from "@app-types/message";
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

        const images = container.querySelectorAll("img, audio");

        if (images.length === 0) {
            scrollToBottom();
            return;
        }

        let loadedCount = 0;
        const totalMedia = images.length;

        const onMediaLoad = () => {
            loadedCount++;
            if (loadedCount === totalMedia) {
                scrollToBottom();
            }
        };

        images.forEach((media) => {
            if (media instanceof HTMLImageElement && media.complete) {
                onMediaLoad();
            } else if (
                media instanceof HTMLAudioElement &&
                media.readyState >= 2
            ) {
                onMediaLoad();
            } else {
                media.addEventListener("load", onMediaLoad, { once: true });
                media.addEventListener("loadeddata", onMediaLoad, {
                    once: true,
                });
                media.addEventListener("error", onMediaLoad, { once: true });
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

            <MessageComposer onSendMessage={sendMessage} />
        </div>
    );
};

export default MessagePage;

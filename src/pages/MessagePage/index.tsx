import Message from "@components/Message";
import MessageComposer from "@components/MessageComposer";
import MessagePageHeader from "@components/MessagePageHeader";
import ParticipantsPanel from "@components/ParticipantsPanel";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useEffect, useRef, type ReactElement } from "react";
import { type TClientMessage } from "@app-types/message";
import "./style.css";

const MessagePage = (): ReactElement => {
    const { messages, messageHandlersConfig, hasMoreHistory } =
        useChatDataContext();
    const { sendMessage, historyRequest } = useWebSocket(messageHandlersConfig);

    const containerRef = useRef<HTMLDivElement>(null);
    const prevScrollHeightRef = useRef<number | null>(null);
    const shouldScrollToBottomRef = useRef(true);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (prevScrollHeightRef.current !== null) {
            container.scrollTop =
                container.scrollHeight - prevScrollHeightRef.current;
            prevScrollHeightRef.current = null;
        }

        if (shouldScrollToBottomRef.current) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        const scrollThreshold = 50;
        const isAtBottom =
            container.scrollHeight - container.scrollTop <=
            container.clientHeight + scrollThreshold;

        shouldScrollToBottomRef.current = isAtBottom;

        if (container.scrollTop === 0 && hasMoreHistory) {
            const oldestMessage = messages[0];
            if (oldestMessage) {
                console.log("LOADING OLDEST MESSAGES");

                prevScrollHeightRef.current = container.scrollHeight;
                historyRequest(oldestMessage.id);
            }
        }
    };

    useEffect(() => {
        historyRequest();
    }, []);

    return (
        <div className="chat-page">
            <MessagePageHeader />
            <ParticipantsPanel />

            <div
                className="messages-container secondary-text"
                ref={containerRef}
                onScroll={handleScroll}
            >
                {messages.map((msg: TClientMessage) => (
                    <Message key={msg.id} message={msg} />
                ))}
            </div>

            <MessageComposer onSendMessage={sendMessage} />
        </div>
    );
};

export default MessagePage;

import Message from "@components/Message";
import MessageComposer from "@components/MessageComposer";
import MessagePageHeader from "@components/MessagePageHeader";
import ParticipantsPanel from "@components/ParticipantsPanel";
import { useWebSocket } from "@hooks/useWebSocket/useWebSocket";
import { useChatDataContext } from "@contexts/СhatDataContext";
import { useRef, useEffect, type ReactElement } from "react";
import { 
    ClientMessagesTypes, 
    type TClientMessage, 
    type ITextMessage, 
    type IFileMessage, 
    type IAudioMessage 
} from "@app-types/message";
import "./style.css";
import { getFormattedTime, getRandomId } from "@utils/constants";
import { MessagesForServerTypes } from "@app-types/serverMessages";
import { type IEncodedFileData } from "@app-types/file";
import FileManager from "@services/FileManager";

const MessagePage = (): ReactElement => {
    const { messages, messageHandlersConfig } = useChatDataContext();
    const { sendMessage } = useWebSocket(messageHandlersConfig);

    const handleMessageSend = (
        type: MessagesForServerTypes,
        data: string | IEncodedFileData
    ) => {
        const username = localStorage.getItem("nickName") || "Unknown User";
        const timestamp = Date.now();

        const baseMessage = {
            id: getRandomId(),
            time: getFormattedTime(timestamp),
            isMine: true,
            sender: username,
        };

        var sentMessage: TClientMessage;

        if (type === MessagesForServerTypes.TEXT_MESSAGE && typeof data === "string") {
            if (!data.trim()) return;

            sentMessage = {
                ...baseMessage,
                type: ClientMessagesTypes.TEXT,
                text: data,
            } as ITextMessage;

        } else if (type === MessagesForServerTypes.FILE_MESSAGE && typeof data !== "string") {
            
            const objectUrl = FileManager.base64ToObjectUrl(data.data, data.type);

            const fileDataForClient = {
                src: objectUrl,
                name: data.name,
                size: data.size,
            };
            
            const messageType = data.type.includes("audio")
                ? ClientMessagesTypes.AUDIO
                : ClientMessagesTypes.FILE;

            sentMessage = {
                ...baseMessage,
                type: messageType,
                fileData: fileDataForClient,
            } as IFileMessage | IAudioMessage;
        } else {
            console.error("Unknown message type or invalid data", type, data);
            return;
        }
        sendMessage(type, data);
    };

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
            } else if (media instanceof HTMLAudioElement && media.readyState >= 2) { 
                 onMediaLoad();
            } else {
                 media.addEventListener('load', onMediaLoad, { once: true });
                 media.addEventListener('loadeddata', onMediaLoad, { once: true }); 
                 media.addEventListener('error', onMediaLoad, { once: true });
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
import { ClientMessagesTypes, type ITextMessage, type TClientMessage } from "@app-types/message";
import { getFormattedTime } from "@utils/constants";
import { useState } from "react";
import {
    MessagesFromServerTypes,
    type IMessageFromServer,
    type IMessageHandlerData,
    type TServerMessages,
} from "@app-types/serverMessages";

export const useChatData = () => {
    const [secondUsername, setSecondUsername] = useState<string | null>(null);
    const [messages, setMessages] = useState<TClientMessage[]>([]);

    const username = localStorage.getItem("nickName");

    const handleNewMessage = (newMessageData: IMessageFromServer): void => {
        console.log("NEW MESSAGE DATA: ", newMessageData);

        const { username: sender, text, id, timestamp } = newMessageData;

        if (newMessageData.username !== username) {
            setSecondUsername(username);
        }

        const formattedTime: string = getFormattedTime(timestamp);

        const newMessage: ITextMessage = {
            id,
            type: ClientMessagesTypes.TEXT,
            text,
            time: formattedTime,
            isMine: sender === username,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const loadMessagesHistory = (
        historyData: Extract<
            TServerMessages,
            { type: MessagesFromServerTypes.HISTORY }
        >
    ): void => {
        console.log("HISTORY DATA: ", historyData);

        const { messages: historyMessages } = historyData;

        historyMessages
            .reverse()
            .forEach((historyMessage: IMessageFromServer) => {
                handleNewMessage(historyMessage);
            });
    };

    const messageHandlersConfig: IMessageHandlerData[] = [
        {
            type: MessagesFromServerTypes.HISTORY,
            action: loadMessagesHistory,
        },
        {
            type: MessagesFromServerTypes.MESSAGE,
            action: handleNewMessage,
        },
    ];

    return {
        secondUsername,
        setSecondUsername,
        messages,
        loadMessagesHistory,
        handleNewMessage,
        messageHandlersConfig,
    };
};

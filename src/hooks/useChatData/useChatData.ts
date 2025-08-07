import {
    MessagesFromServerTypes,
    type IMessageFromServer,
    type IMessageHandlerData,
    type TServerMessages,
} from "@app-types/serverMessages";
import { getFormattedTime } from "@utils/constants";
import { type IMessage } from "@app-types/message";
import { useState } from "react";

export const useChatData = () => {
    const [secondUsername, setSecondUsername] = useState<string | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);

    const username = localStorage.getItem("nickName");

    const handleNewMessage = (newMessageData: IMessageFromServer): void => {
        console.log("NEW MESSAGE DATA: ", newMessageData);

        const { username: sender, text, id, timestamp } = newMessageData;

        if (newMessageData.username !== username) {
            setSecondUsername(username);
        }

        const formattedTime: string = getFormattedTime(timestamp);

        const newMessage: IMessage = {
            id,
            text,
            time: formattedTime,
            isMine: sender === username,
            sender,
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

import { getFormattedTime } from "@utils/constants";
import { useState, useContext, createContext } from "react";
import { type IMessage } from "@app-types/message";
import { type IUser } from "@app-types/user";
import {
    MessagesFromServerTypes,
    type IMessageFromServer,
    type IMessageHandlerData,
    type TServerMessages,
} from "@app-types/serverMessages";
import React from "react";

interface IChatDataContext {
    setSecondUsername: (username: string | null) => void;
    secondUsername: string | null;
    messages: IMessage[];
    users: IUser[];
    loadMessagesHistory: (
        historyData: Extract<
            TServerMessages,
            { type: MessagesFromServerTypes.HISTORY }
        >
    ) => void;
    handleNewMessage: (newMessageData: IMessageFromServer) => void;
    messageHandlersConfig: IMessageHandlerData[];
}

const ChatDataContext = createContext<IChatDataContext | null>(null);

export const ChatDataProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [secondUsername, setSecondUsername] = useState<string | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

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

    const loadAllUsers = (data: { users: IUser[] }): void => {
        setUsers(() => {
            return [...data.users];
        });
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
        {
            type: MessagesFromServerTypes.USERS,
            action: loadAllUsers,
        },
    ];

    return (
        <ChatDataContext.Provider
            value={{
                secondUsername,
                setSecondUsername,
                messages,
                users,
                loadMessagesHistory,
                handleNewMessage,
                messageHandlersConfig,
            }}
        >
            {children}
        </ChatDataContext.Provider>
    );
};

export const useChatDataContext = () => {
    const context = useContext(ChatDataContext);
    if (!context) {
        throw new Error(
            "useChatDataContext must be used within ChatDataProvider"
        );
    }
    return context;
};

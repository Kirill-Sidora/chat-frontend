import React from "react";
import { type IUser, type IUserStatusChanged } from "@app-types/user";
import { useState, useEffect, useContext, createContext } from "react";
import { type TClientMessage } from "@app-types/message";
import {
    MessagesFromServerTypes,
    type IMessageHandlerData,
    type TServerMessages,
    type TWebSocketMessage,
} from "@app-types/serverMessages";
import MessageParser from "@services/MessageParser";

interface IChatDataContext {
    messages: TClientMessage[];
    users: IUser[];
    loadMessagesHistory: (
        historyData: Extract<
            TServerMessages,
            { type: MessagesFromServerTypes.HISTORY }
        >
    ) => void;
    messageHandlersConfig: IMessageHandlerData[];
}

const ChatDataContext = createContext<IChatDataContext | null>(null);

export const ChatDataProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [messages, setMessages] = useState<TClientMessage[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    const username = localStorage.getItem("nickName");

    const handleNewMessage = (
        newWebSocketMessageData: Extract<
            TServerMessages,
            { type: MessagesFromServerTypes.MESSAGE }
        >
    ): void => {
        if (!username) {
            return;
        };

        const newMessageData = newWebSocketMessageData.message;

        console.log("NEW MESSAGE DATA: ", newMessageData);

        const parsedMessage: TClientMessage = MessageParser.parseServerMessage(
            newMessageData,
            username
        );

        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };

    const loadAllUsers = (data: { users: IUser[] }): void => {
        setUsers(() => {
            return [...data.users];
        });
    };

    const loadMessage = (messageData: TWebSocketMessage): void => {
         if (!username) {
            return;
        };

        console.log("NEW MESSAGE DATA: ", messageData);

        const parsedMessage: TClientMessage = MessageParser.parseServerMessage(
            messageData,
            username
        );

        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    }

    const updateUserStatus = (statusData: IUserStatusChanged): void => {
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) =>
                user.id === statusData.id
                    ? { ...user, isOnline: statusData.isOnline }
                    : user
            );
            return updatedUsers;
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
            .forEach((historyMessage: any) => {
                loadMessage(historyMessage);
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
        {
            type: MessagesFromServerTypes.USER_STATUS_CHANGED,
            action: updateUserStatus,
        },
    ];

    return (
        <ChatDataContext.Provider
            value={{
                messages,
                users,
                loadMessagesHistory,
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

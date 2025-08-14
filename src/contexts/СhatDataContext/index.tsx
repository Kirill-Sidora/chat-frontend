import React from "react";
import MessageParser from "@services/MessageParser";
import {
    MessagesFromServerTypes,
    type IMessageHandlerData,
    type TServerMessages,
    type TWebSocketMessage,
} from "@app-types/serverMessages";
import { type IUser, type IUserStatusChanged } from "@app-types/user";
import { useState, useContext, createContext } from "react";
import { type TClientMessage } from "@app-types/message";

interface IChatDataContext {
    messages: TClientMessage[];
    users: IUser[];
    loadMessagesHistory: (historyMessages: TWebSocketMessage[]) => void;
    messageHandlersConfig: IMessageHandlerData[];
}

export const ChatDataContext = createContext<IChatDataContext | null>(null);

export const ChatDataProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [messages, setMessages] = useState<TClientMessage[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);

    const username = localStorage.getItem("nickName");

    const handleNewMessage = (newMessageData: TWebSocketMessage): void => {
        if (!username) {
            return;
        }

        console.log("NEW MESSAGE DATA: ", newMessageData);

        const parsedMessage: TClientMessage = MessageParser.parseServerMessage(
            newMessageData,
            username
        );

        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };

    const loadAllUsers = (allUsers: IUser[]): void => {
        setUsers(allUsers);
    };

    const loadMessage = (messageData: TWebSocketMessage): void => {
        if (!username) {
            return;
        }

        console.log("NEW MESSAGE DATA: ", messageData);

        const parsedMessage: TClientMessage = MessageParser.parseServerMessage(
            messageData,
            username
        );

        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };

    const updateUserStatus = (statusData: IUserStatusChanged): void => {
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) =>
                user.id !== statusData.id
                    ? user
                    : { ...user, isOnline: statusData.isOnline }
            );

            return updatedUsers;
        });
    };

    const loadMessagesHistory = (historyData: TWebSocketMessage[]): void => {
        console.log("HISTORY DATA: ", historyData);

        historyData.reverse().forEach((historyMessage: any) => {
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

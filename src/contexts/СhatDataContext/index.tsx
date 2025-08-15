import React from "react";
import MessageParser from "@services/MessageParser";
import {
    MessagesFromServerTypes,
    type IMessageHandlerData,
    type TWebSocketMessage,
} from "@app-types/serverMessages";
import { type IUser, type IUserStatusChanged } from "@app-types/user";
import { useState, useEffect, useContext, createContext } from "react";
import { type TClientMessage } from "@app-types/message";

interface IChatDataContext {
    messages: TClientMessage[];
    users: IUser[];
    loadMessagesHistory: (historyMessages: TWebSocketMessage[]) => void;
    messageHandlersConfig: IMessageHandlerData[];
    avatarUrl: string;
    setAvatarUrl: (url: string) => void;
}
const defaultAvatar = "src/assets/images/user-icon.png";

export const ChatDataContext = createContext<IChatDataContext | null>(null);

export const ChatDataProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [messages, setMessages] = useState<TClientMessage[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [avatarUrl, setAvatarUrl] = useState<string>(() => {
        const savedAvatar = localStorage.getItem("avatarUrl");
        return savedAvatar || defaultAvatar;
    });

    const username = localStorage.getItem("nickName");

    useEffect(() => {
        localStorage.setItem("avatarUrl", avatarUrl);
    }, [avatarUrl]);

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
                avatarUrl,
                setAvatarUrl,
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

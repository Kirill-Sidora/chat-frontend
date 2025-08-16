import MessageParser from "@services/MessageParser";
import { useState, useContext, createContext, useCallback } from "react";
import { IMAGE_URL_PREFIX, IMAGE_URL_SUFFIX } from "@utils/constants";
import { type IUser, type IUserStatusChanged } from "@app-types/user";
import { type TClientMessage } from "@app-types/message";
import React, { Dispatch, SetStateAction } from "react";
import {
    MessagesFromServerTypes,
    type TWebSocketMessage,
} from "@app-types/serverMessages";

interface IChatDataContext {
    messages: TClientMessage[];
    setMessages: Dispatch<SetStateAction<TClientMessage[]>>;
    users: IUser[];
    messageHandlersConfig: IMessageHandlerData[];
    avatarUrl: string;
    setAvatarUrl: (url: string) => void;
}

interface IMessageHandlerData {
    type: MessagesFromServerTypes;
    action: (payload: any) => void;
}

const defaultSrc = "user-icon";

export const ChatDataContext = createContext<IChatDataContext | null>(null);

export const ChatDataProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [messages, setMessages] = useState<TClientMessage[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [avatarUrl, setAvatarUrl] = useState<string>(
        IMAGE_URL_PREFIX + defaultSrc + IMAGE_URL_SUFFIX
    );

    const username = localStorage.getItem("nickName");

    const handleNewMessage = useCallback(
        (newMessageData: TWebSocketMessage) => {
            if (!username) {
                return;
            }

            const parsedMessage: TClientMessage =
                MessageParser.parseServerMessage(newMessageData, username);

            setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        },
        [username]
    );

    const loadAllUsers = useCallback((allUsers: IUser[]): void => {
        setUsers(allUsers);
    }, []);

    const updateUserStatus = useCallback(
        (statusData: IUserStatusChanged): void => {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id !== statusData.id
                        ? user
                        : { ...user, isOnline: statusData.isOnline }
                )
            );
        },
        []
    );

    const loadMessagesHistory = useCallback(
        (historyData: TWebSocketMessage[]): void => {
            if (!username) {
                return;
            }

            const parsedHistory = historyData.map((historyMessage) =>
                MessageParser.parseServerMessage(historyMessage, username)
            );

            setMessages(parsedHistory.reverse());
        },
        [username]
    );

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
            type: MessagesFromServerTypes.FILE,
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
        {
            type: MessagesFromServerTypes.USER_STATUS,
            action: loadAllUsers,
        },
    ];

    return (
        <ChatDataContext.Provider
            value={{
                messages,
                setMessages,
                users,
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

import {
    MessagesFromServerTypes,
    type IMessageFromServer,
    type IMessageHandlerData,
    type TServerMessages,
} from "@app-types/serverMessages";
import { getFormattedTime } from "@utils/constants";
import { type IMessage } from "@app-types/message";
import { useEffect, useState } from "react";
import { type IUser } from "@app-types/user";

export const useChatData = () => {
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
        setUsers((prevUsers) => {
            console.log("Previous users:", prevUsers);
            console.log("New users:", data.users);
            return data.users;
        });
    };

    useEffect(() => {
        console.log("USERS CHANGED: ", users);
    }, [users]);

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

    return {
        secondUsername,
        setSecondUsername,
        messages,
        users,
        loadMessagesHistory,
        handleNewMessage,
        messageHandlersConfig,
    };
};

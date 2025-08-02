import { type IMessageHandlerData } from "@app-types/messageHandlers";
import { type IMessage } from "@app-types/message";
import { useState } from "react";

export const useChatData = () => {
    const [secondUsername, setSecondUsername] = useState<string | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);

    const username = localStorage.getItem("nickName");

    const handleNewMessage = (newMessageData: any): void => {
        console.log("NEW MESSAGE DATA: ", newMessageData);

        const { username: sender, text } = newMessageData;

        if (newMessageData.username !== username) {
            setSecondUsername(username);
        }

        const newMessage: IMessage = {
            id: Date.now().toString(),
            text,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            isMine: sender === username,
            sender,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const loadMessagesHistory = (historyData: any): void => {
        console.log("HISTORY DATA: ", historyData);

        const { messages: historyMessages } = historyData;

        historyMessages.forEach((historyMessage: any) => {
            handleNewMessage(historyMessage);
        });
    };

    const messageHandlersConfig: IMessageHandlerData[] = [
        {
            type: "history",
            action: loadMessagesHistory,
        },
        {
            type: "msg",
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

import { getRandomId } from "@utils/constants";
import { useEffect, useState } from "react";
import {
    MessagesForServerTypes,
    MessagesFromServerTypes,
    type IMessageHandlerData,
    type TServerMessages,
} from "@app-types/serverMessages";
import type { IEncodedFileData } from "@app-types/file";

const BACKEND_WEB_SOCKET_URL: string = "ws://localhost:3001";

const messagePayloadExtractors: Partial<
    Record<MessagesFromServerTypes, (data: any) => any>
> = {
    [MessagesFromServerTypes.HISTORY]: (data) => data.messages,
    [MessagesFromServerTypes.MESSAGE]: (data) => data.message,
    [MessagesFromServerTypes.USERS]: (data) => data.users,
    [MessagesFromServerTypes.USER_STATUS_CHANGED]: (data) => ({
        id: data.id,
        username: data.username,
        isOnline: data.isOnline,
    }),
    [MessagesFromServerTypes.ERROR]: (data) => data.message,
};

const messageBodyBuilder: Partial<
    Record<MessagesForServerTypes, (data: any) => object>
> = {
    [MessagesForServerTypes.TEXT_MESSAGE]: (data) => ({ text: data }),
    [MessagesForServerTypes.FILE_MESSAGE]: (data) => ({ file: data }),
    [MessagesForServerTypes.AUDIO_MESSAGE]: (data) => ({ file: data }),
};

export const useWebSocket = (handlersConfig: IMessageHandlerData[]) => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    const username = localStorage.getItem("nickName");

    useEffect(() => {
        if (!username) return;

        const socket = new WebSocket(BACKEND_WEB_SOCKET_URL);

        socket.onopen = () => {
            console.log("Connected to ws");

            const initialMessageForServer = {
                type: MessagesForServerTypes.INITIAL,
                username,
                id: getRandomId(),
            };

            socket.send(JSON.stringify(initialMessageForServer));
        };

        socket.onmessage = (event) => {
            const data: TServerMessages = JSON.parse(event.data);
            console.log("MESSAGE FROM SERVER: ", data);

            const handlerData = handlersConfig.find(
                (h) => h.type === data.type
            );

            const getMessageBody = messagePayloadExtractors[data.type];

            if (!handlerData || !getMessageBody) {
                return;
            }

            const payload = getMessageBody(data);

            handlerData.action(payload);
        };

        setWebSocket(socket);

        return () => {
            socket.close();
        };
    }, [username]);

    const sendMessage = (
        type: MessagesForServerTypes,
        data: string | IEncodedFileData
    ) => {
        if (!webSocket || webSocket.readyState !== WebSocket.OPEN) {
            return;
        }

        const buildBody = messageBodyBuilder[type];

        if (!buildBody) {
            console.error(`No message body builder found for type: ${type}`);
            return;
        }

        const messageForServer = {
            type,
            ...buildBody(data),
        };

        webSocket.send(JSON.stringify(messageForServer));
    };

    return { sendMessage };
};

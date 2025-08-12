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

            if (!handlerData) return;

            if (data.type === MessagesFromServerTypes.HISTORY) {
                handlerData.action(data.messages);
                return;
            }

            if (data.type === MessagesFromServerTypes.MESSAGE) {
                handlerData.action(data.message);
                return;
            }

            if (data.type === MessagesFromServerTypes.USERS) {
                handlerData.action(data.users);
                return;
            }

            if (data.type === MessagesFromServerTypes.USER_STATUS_CHANGED) {
                const statusData = {
                    id: data.id,
                    username: data.username,
                    isOnline: data.isOnline,
                };

                handlerData.action(statusData);
                return;
            }

            handlerData.action(data);
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

        const messageForServer: Record<string, any> = { type };

        if ((type = MessagesForServerTypes.TEXT_MESSAGE)) {
            messageForServer.text = data;
        }

        if ((type = MessagesForServerTypes.AUDIO_MESSAGE)) {
            messageForServer.file = data;
        }

        if ((type = MessagesForServerTypes.FILE_MESSAGE)) {
            messageForServer.file = data;
        }

        webSocket.send(JSON.stringify(messageForServer));
    };

    return { sendMessage };
};

import { getRandomId } from "@utils/constants";
import { useEffect, useState } from "react";
import {
    MessagesForServerTypes,
    MessagesFromServerTypes,
    type IMessageHandlerData,
    type TServerMessages,
} from "@app-types/serverMessages";


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

            const messageType: MessagesFromServerTypes = data.type;

            handlersConfig.map((handlerData: IMessageHandlerData) => {
                const { type: currentHandlerType, action } = handlerData;

                if (currentHandlerType !== messageType) {
                    return;
                }

                action(data);
            });
        };

        setWebSocket(socket);

        return () => {
            socket.close();
        };
    }, [username]);

    const sendMessage = (text: string) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            const messageForServer = {
                type: MessagesForServerTypes.MESSAGE,
                text,
                sender: username,
            };

            webSocket.send(JSON.stringify(messageForServer));
        }
    };

    return { sendMessage };
};

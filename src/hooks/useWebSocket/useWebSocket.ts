import type { IMessageHandlerData } from "@app-types/messageHandlers";
import { useEffect, useState } from "react";

function getRandomId() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2).toString()
    );
}

const BACKEND_WEB_SOCKET_URL: string = "ws://localhost:3001";

export const useWebSocket = (handlersConfig: IMessageHandlerData[]) => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    const username = localStorage.getItem("nickName");

    useEffect(() => {
        if (!username) return;

        const socket = new WebSocket(BACKEND_WEB_SOCKET_URL);

        socket.onopen = () => {
            console.log("Connected to ws");
            
            socket.send(
                JSON.stringify({ type: "init", username, id: getRandomId() })
            );
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("MESSAGE FROM SERVER: ", data);

            const messageType: string = data.type;

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

    const sendMessage = (text: string | Blob) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify({ type: "msg", text, sender: username }));
        }
    };

    return { sendMessage };
};

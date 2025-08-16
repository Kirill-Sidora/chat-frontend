import AudioPlayer from "@services/AudioPlayer";
import { MessagesForServerTypes, MessagesFromServerTypes, type IMessageHandlerData, type TServerMessages } from "@app-types/serverMessages";
import { type IEncodedFileData } from "@app-types/file";
import { getRandomId } from "@utils/constants";
import { useEffect, useState } from "react";
import { SoundIds } from "@utils/constants"

const BACKEND_WEB_SOCKET_URL: string = import.meta.env
    .VITE_BACKEND_WEB_SOCKET_URL;

const messagePayloadExtractors: Partial<
    Record<MessagesFromServerTypes, (data: any) => any>
> = {
    [MessagesFromServerTypes.HISTORY]: (data) => data.messages,
    [MessagesFromServerTypes.MESSAGE]: (data) => data,
    [MessagesFromServerTypes.FILE]: (data) => data,
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
};

export const useWebSocket = (handlersConfig: IMessageHandlerData[]) => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    const username = localStorage.getItem("nickName");

    useEffect(() => {
        if (!username) {
            return;
        }

        const socket = new WebSocket(BACKEND_WEB_SOCKET_URL);

        socket.onopen = () => {
            console.log("Connected to ws");

            AudioPlayer.playSound(SoundIds.CONNECTED_TO_CHAT);

            const initialMessageForServer = {
                type: MessagesForServerTypes.INITIAL,
                username,
                id: getRandomId(),
            };

            socket.send(JSON.stringify(initialMessageForServer));
        };

        socket.onmessage = (event) => {
            const data: TServerMessages = JSON.parse(event.data);
            
            AudioPlayer.triggerNotificationSound(data, username);

            const handlerData = handlersConfig.find(
                (handlerData: IMessageHandlerData) =>
                    handlerData.type === data.type
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

        console.log("BODY FOR SERVER FUNCTION: ", buildBody);

        if (!buildBody) {
            console.error(`No message body builder found for type: ${type}`);
            return;
        }

        const messageForServer = {
            type,
            ...buildBody(data),
        };

        console.log("MESSAGE FOR SERVER: ", messageForServer);

        webSocket.send(JSON.stringify(messageForServer));
    };

    return { sendMessage };
};

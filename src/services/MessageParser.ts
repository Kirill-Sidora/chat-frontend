import FileManager from "./FileManager";
import { ClientMessagesTypes, type IDefaultMessage, type TClientMessage } from "@app-types/message";
import { type TWebSocketMessage, IServerFileMessage } from "@app-types/serverMessages";
import { getFormattedTime } from "@utils/constants";

class MessageParser {
    public static parseServerMessage = (
        serverMessageData: TWebSocketMessage,
        username: string
    ): TClientMessage => {
        const { sender, timestamp, id } = serverMessageData;

        const formattedTime: string = getFormattedTime(timestamp);

        const basedMessageData: IDefaultMessage = {
            id,
            time: formattedTime,
            isMine: sender === username,
            type: serverMessageData.type,
            sender: sender,
        };

        if (serverMessageData.type === ClientMessagesTypes.TEXT) {
            return {
                ...basedMessageData,
                text: serverMessageData.text,
                type: ClientMessagesTypes.TEXT,
            };
        }

        const fileMessage = serverMessageData as IServerFileMessage;
        const fileSrc: string = FileManager.base64ToObjectUrl(fileMessage.fileData, fileMessage.mimeType);

        const fileData = {
            src: fileSrc,
            name: fileMessage.fileName,
            size: fileMessage.fileSize,
        };

        if (fileMessage.mimeType.includes("audio")) {
            return {
                ...basedMessageData,
                fileData,
                type: ClientMessagesTypes.AUDIO,
            };
        }

        return {
            ...basedMessageData,
            fileData,
            type: ClientMessagesTypes.FILE,
        };
    };
}

export default MessageParser;
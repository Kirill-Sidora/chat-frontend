import type { IDefaultMessage, TClientMessage } from "@app-types/message";
import type { TWebSocketMessage } from "@app-types/serverMessages";
import { getFormattedTime } from "@utils/constants";
import FileManager from "./FileManager";

class MessageParser {
    public static parseServerMessage = (
        serverMessageData: TWebSocketMessage,
        username: string
    ): TClientMessage => {
        console.log("UNPARSED MESSAGE DATA: ", serverMessageData);

        const { sender, timestamp, id, type } = serverMessageData;

        const formattedTime: string = getFormattedTime(timestamp);

        console.log("USERNAME AND SENDER: ", username, sender);

        const basedMessageData: IDefaultMessage = {
            id,
            time: formattedTime,
            isMine: sender === username,
            type,
        };

        if (type === "text") {
            return {
                ...basedMessageData,
                text: serverMessageData.text,
                type,
            };
        };

        console.log("SERVER FILE MESSAGE: ", serverMessageData);

        const { fileData, fileName, fileSize, mimeType } = serverMessageData;

        const fileSrc: string = FileManager.base64ToObjectUrl(fileData);

        if (mimeType.includes("audio")) {
            console.log("AUDIO FILE SRC: ", fileSrc);
        }

        return {
            ...basedMessageData,
            fileData: {
                src: fileSrc,
                name: fileName,
                size: fileSize,
            },
            type,
        };
    };
}

export default MessageParser;

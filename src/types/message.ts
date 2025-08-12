import type { IDecodedFileData } from "./file";

export const enum ClientMessagesTypes {
    TEXT = "text",
    AUDIO = "audio",
    FILE = "file",
}

export interface IDefaultMessage {
    id: string;
    type: ClientMessagesTypes;
    time: string;
    isMine: boolean;
    sender: string;
};

export interface ITextMessage extends IDefaultMessage {
    type: ClientMessagesTypes.TEXT;
    text: string;
};

export interface IFileMessage extends IDefaultMessage {
    type: ClientMessagesTypes.FILE;
    fileData: IDecodedFileData;
};

export interface IAudioMessage extends IDefaultMessage {
    type: ClientMessagesTypes.AUDIO;
    fileData: IDecodedFileData;
};

export type TClientMessage = ITextMessage | IFileMessage | IAudioMessage;

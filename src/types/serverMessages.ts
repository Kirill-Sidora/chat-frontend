import type { ClientMessagesTypes } from "./message";
import type { IUser } from "./user";

export const enum MessagesForServerTypes {
    INITIAL = "init",
    TEXT_MESSAGE = "textMessage",
    FILE_MESSAGE = "fileMessage",
    AUDIO_MESSAGE = "audioMessage",
}

export const enum MessagesFromServerTypes {
    HISTORY = "history",
    ERROR = "error",
    MESSAGE = "msg",
    USERS = "usersData",
    USER_STATUS_CHANGED = "userStatusChanged",
}

export interface IBaseMessage {
    id: string;
    sender: string;
    timestamp: number;
}

export interface ITextMessage extends IBaseMessage {
    type: ClientMessagesTypes.TEXT;
    text: string;
}

export interface IAudioMessage extends IBaseMessage {
    type: ClientMessagesTypes.AUDIO;
    fileData: Buffer;
    fileName: string;
    fileSize: number;
    mimeType: string;
}

export interface IFileMessage extends IBaseMessage {
    type: ClientMessagesTypes.FILE;
    fileData: Buffer;
    fileName: string;
    fileSize: number;
    mimeType: string;
}

export interface IMessageHandlerData {
    type: MessagesFromServerTypes;
    action: any;
}

export type TWebSocketMessage = ITextMessage | IFileMessage | IAudioMessage;

export type TServerMessages =
    | { type: MessagesFromServerTypes.HISTORY; messages: TWebSocketMessage[] }
    | { type: MessagesFromServerTypes.ERROR; message: string }
    | {
          type: MessagesFromServerTypes.MESSAGE;
          message: TWebSocketMessage;
      }
    | { type: MessagesFromServerTypes.USERS; users: IUser[] }
    | {
          type: MessagesFromServerTypes.USER_STATUS_CHANGED;
          username: string;
          id: string;
          isOnline: boolean;
      };

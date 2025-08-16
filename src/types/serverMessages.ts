import { type ClientMessagesTypes } from "./message";
import { type IUser } from "./user";

export const enum MessagesForServerTypes {
    INITIAL = "init",
    TEXT_MESSAGE = "text",
    FILE_MESSAGE = "file",
}

export const enum MessagesFromServerTypes {
    HISTORY = "history",
    ERROR = "error",
    MESSAGE = "text",
    FILE = "file",
    USERS = "userData",
    USER_STATUS = "userStatus",
    USER_STATUS_CHANGED = "userStatusChanged",
}

export interface IBaseMessage {
    id: string;
    sender: string;
    timestamp: number;
}

export interface IServerTextMessage extends IBaseMessage {
    type: ClientMessagesTypes.TEXT;
    text: string;
}

export interface IServerFileMessage extends IBaseMessage {
    type: ClientMessagesTypes.FILE | ClientMessagesTypes.AUDIO;
    fileData: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
}

export interface IMessageHandlerData {
    type: MessagesFromServerTypes;
    action: any;
}

export type TWebSocketMessage = IServerTextMessage | IServerFileMessage;

export type TServerMessages =
    | { type: MessagesFromServerTypes.HISTORY; messages: TWebSocketMessage[] }
    | { type: MessagesFromServerTypes.ERROR; message: string }
    | { type: MessagesFromServerTypes.MESSAGE; sender: string }
    | { type: MessagesFromServerTypes.USERS; users: IUser[] }
    | {
          type: MessagesFromServerTypes.USER_STATUS_CHANGED;
          id: string;
          isOnline: boolean;
      };

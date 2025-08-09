import type { IUser } from "./user";

export const enum MessagesForServerTypes {
    INITIAL = "init",
    MESSAGE = "msg",
}

export const enum MessagesFromServerTypes {
    HISTORY = "history",
    ERROR = "error",
    MESSAGE = "msg",
    USERS = "usersData",
    USER_STATUS_CHANGED = "userStatusChanged",
}

export interface IMessageFromServer {
    id: string;
    username: string;
    text: string;
    timestamp: number;
}

export interface IMessageHandlerData {
    type: MessagesFromServerTypes;
    action: any;
}

export type TServerMessages =
    | { type: MessagesFromServerTypes.HISTORY; messages: IMessageFromServer[] }
    | { type: MessagesFromServerTypes.ERROR; message: string }
    | {
          type: MessagesFromServerTypes.MESSAGE;
          username: string;
          text: string;
          timestamp: number;
      }
    | { type: MessagesFromServerTypes.USERS; users: IUser[] }
    | {
          type: MessagesFromServerTypes.USER_STATUS_CHANGED;
          username: string;
          id: string;
          isOnline: boolean;
      };

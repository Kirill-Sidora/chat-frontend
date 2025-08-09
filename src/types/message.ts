export const enum ClientMessagesTypes {
    TEXT = "text",
    IMAGE = "image",
}

export interface IDefaultMessage {
    id: string;
    type: ClientMessagesTypes;
    time: string;
    isMine: boolean;
};

export interface ITextMessage extends IDefaultMessage {
    type: ClientMessagesTypes.TEXT;
    text: string;
};

export interface IImageMessage extends IDefaultMessage {
    type: ClientMessagesTypes.IMAGE;
    src: string;
};

export type TClientMessage = ITextMessage;

import {
    ClientMessagesTypes,
    type IAudioMessage,
    type IFileMessage,
    type ITextMessage,
    type TClientMessage,
} from "@app-types/message";
import { Fragment, type ReactElement } from "react";
import "./style.css";

interface IClientMessageProps {
    message: TClientMessage;
}

interface IFileMessageProps {
    message: IFileMessage;
}

interface ITextMessageProps {
    message: ITextMessage;
}

interface IAudioMessageProps {
    message: IAudioMessage;
}

const FileMessage = ({ message }: IFileMessageProps): ReactElement => {
    return (
        <div className="file-message">
            <img src={message.fileData.src} alt="message-image" />
        </div>
    );
};

const AudioMessage = ({ message }: IAudioMessageProps): ReactElement => {
    return (
        <div className="file-message">
            <audio controls src={message.fileData.src} />
        </div>
    );
};

const TextMessage = ({ message }: ITextMessageProps): ReactElement => {
    return (
        <Fragment>
            <div className="message-text secondary-text">{message.text}</div>
            <div className="message-time meta-text">{message.time}</div>
        </Fragment>
    );
};

const messageElementByType: Record<ClientMessagesTypes, any> = {
    [ClientMessagesTypes.TEXT]: TextMessage,
    [ClientMessagesTypes.FILE]: FileMessage,
    [ClientMessagesTypes.AUDIO]: AudioMessage,
};

const ClientMessage = ({ message }: IClientMessageProps): ReactElement => {
    const CurrentMessageElement = messageElementByType[message.type];

    return (
        <div
            className={`message ${!message.isMine ? "other" : "mine"} ${
                message.type
            }`}
        >
            <CurrentMessageElement message={message} />
        </div>
    );
};

export default ClientMessage;
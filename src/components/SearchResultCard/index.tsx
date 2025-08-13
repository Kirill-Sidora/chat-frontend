import { ITextMessage } from "@app-types/message";
import { ReactElement } from "react";
import "./style.css";

interface ISearchMessageCard {
    message: ITextMessage;
}

const SearchMessageCard = ({ message }: ISearchMessageCard): ReactElement => {
    const messengeSenderLabel: string = message.isMine
        ? "My message"
        : "Someone else's message";

    return (
        <div className="search-message-card">
            <span className="username primary-text">{messengeSenderLabel}</span>
            <div className="message-content primary-text">{message.text}</div>
            <span className="timestamp">{message.time}</span>
        </div>
    );
};

export default SearchMessageCard;

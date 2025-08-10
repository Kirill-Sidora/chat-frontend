import { TClientMessage } from "@app-types/message";
import { ReactElement } from "react";
import "./style.css";

interface ISearchMessageCard {
    message: TClientMessage;
}

const SearchMessageCard = ({ message }: ISearchMessageCard): ReactElement => {
    return (
        <div className="search-message-card">
            <span className="username">
                {message.isMine ? "Моё сообщение" : "Чужое сообщение"}
            </span>
            <div className="message-content">{message.text}</div>
            <span className="timestamp">{message.time}</span>
        </div>
    );
};

export default SearchMessageCard;

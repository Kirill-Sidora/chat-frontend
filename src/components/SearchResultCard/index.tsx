import { TClientMessage } from "@app-types/message";
import { ReactElement } from "react";
import "./style.css";

interface ISearchMessageCard {
    message: TClientMessage;
}

const SearchMessageCard = ({ message }: ISearchMessageCard): ReactElement => {
    // const avatarUrl: string =
    //     "https://yt3.googleusercontent.com/Lz67wA_xyLJOpDaZV4-EGaKoAiCwKZ5wLr0dryTcICp-LtF83iKjlLbekaLqIYo_hkWlcKn1=s900-c-k-c0x00ffffff-no-rj";
    return (
        <div className="search-message-card">
            {/* <div className="avatar">
                <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="avatar-image"
                />
            </div> */}
            <span className="username primary-text">
                {message.isMine ? "Моё сообщение" : "Чужое сообщение"}
            </span>
            {"text" in message && (
                <div className="message-content primary-text">
                    {message.text}
                </div>
            )}
            <span className="timestamp">{message.time}</span>
        </div>
    );
};

export default SearchMessageCard;

import { ReactElement } from "react";
import "./style.css";

const MessagePageHeader = (): ReactElement => {
    return (
        <header className="chat-header">
            <img src="src/assets/images/user-icon.png" className="user-icon" />
        </header>
    );
};
export default MessagePageHeader;

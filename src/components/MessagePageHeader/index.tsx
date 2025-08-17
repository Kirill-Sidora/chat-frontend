import AvatarUploader from "@components/AvatarUploader";
import { ReactElement } from "react";
import "./style.css";

const MessagePageHeader = (): ReactElement => {
    return (
        <header className="chat-header">
            <AvatarUploader />
        </header>
    );
};
export default MessagePageHeader;

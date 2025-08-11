import AsideBar from "@components/AsideBar";
import { ReactElement } from "react";
import "./style.css";

interface IMessagePageLayout {
    children: React.ReactNode;
}

const MessagePageLayout = ({ children }: IMessagePageLayout): ReactElement => {
    return (
        <div className="message-page-container">
            <div className="aside-bar-wrapper">
                <AsideBar />
            </div>

            <div className="message-page-content">{children}</div>
        </div>
    );
};

export default MessagePageLayout;

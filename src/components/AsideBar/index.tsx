import MessageSearchBlock from "@components/MessageSearchBlock";
import { type ReactElement } from "react";
import "./style.css";

const AsideBar = (): ReactElement => {
    return (
        <div className="aside-bar-container">
            <MessageSearchBlock />
        </div>
    );
};

export default AsideBar;

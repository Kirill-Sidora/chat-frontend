import { useChatDataContext } from "@contexts/СhatDataContext";
import { type ReactElement } from "react";
import "./style.css";

const Avatar = (): ReactElement => {
    const { avatarUrl } = useChatDataContext();

    return <img src={avatarUrl} className="avatar" alt="User avatar" />;
};

export default Avatar;

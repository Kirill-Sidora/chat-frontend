import { type ReactElement } from "react";
import "./style.css";

interface IAvatarProps {
    url: string;
}

const Avatar = ({ url }: IAvatarProps): ReactElement => {
    return <img src={url} className="avatar" alt="User avatar" />;
};

export default Avatar;

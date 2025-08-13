import { type IUser } from "@app-types/user";
import { type ReactElement } from "react";
import "./style.css";

interface IParticipantCardProps {
    user: IUser;
}

const ParticipantCard = ({ user }: IParticipantCardProps): ReactElement => {
    const statusUser: string = !user.isOnline ? "offline" : "online";

    return (
        <div className="participant-card" key={user.id}>
            <div className={`status-indicator ${statusUser}`} />
            <div className="participant-card-text">{user.username}</div>
        </div>
    );
};

export default ParticipantCard;
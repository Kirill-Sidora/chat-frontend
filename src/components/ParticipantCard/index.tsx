import type { ReactElement } from "react";
import type { IChatUser } from "@app-types/user";
import "./style.css";

interface IParticipantCardProps {
    user: IChatUser;
}

const ParticipantCard = ({ user }: IParticipantCardProps): ReactElement => {
    return (
        <div className="participant-card" key={user.id}>
            <div
                className={`status-indicator ${
                    !user.isOnline ? "offline" : "online"
                }`}
                title={!user.isOnline ? "Не в сети" : "В сети"}
            />

            <div className="participant-card-text">{user.username}</div>
        </div>
    );
};

export default ParticipantCard;

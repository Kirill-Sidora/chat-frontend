import { useState, type ReactElement } from "react";
import "./style.css";

interface IChatUser {
    id: string;
    username: string;
    isOnline: boolean;
}

const fakeUsers: IChatUser[] = Array.from({ length: 80 }, (_, index) => ({
    id: `user-${index + 1}`,
    username: `user${index + 1}`,
    isOnline: index % 2 === 0,
}));

const ParticipantsList = (): ReactElement => {
    const [showAll, setShowAll] = useState(false);

    const visibleCount: number = 8;
    const visibleUsers = showAll ? fakeUsers : fakeUsers.slice(0, visibleCount);

    const toggleShowAll = () => setShowAll(!showAll);
    return (
        <div className="participants-block">
            <h3 className="participants-header">Participants Telegram 2</h3>

            <div className="divider"></div>
            <div className="participants-container">
                {visibleUsers.map((user) => (
                    <div className="participant-card" key={user.id}>
                        <div
                            className={`status-indicator ${
                                !user.isOnline ? "offline" : "online"
                            }`}
                            title={!user.isOnline ? "Не в сети" : "В сети"}
                        />

                        <div className="participant-card-text">
                            {user.username}
                        </div>
                    </div>
                ))}
            </div>
            <button className="show-all-button" onClick={toggleShowAll}>
                {!showAll ? "Show more" : "Return"}
            </button>
        </div>
    );
};

export default ParticipantsList;

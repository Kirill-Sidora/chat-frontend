import CloseListButton from "@components/CloseListButton";
import { useState, type ReactElement } from "react";
import { type IChatUser } from "@app-types/user";
import "./style.css";

interface IParticipantsListProps {
    visibleCount: number;
}

const fakeUsers: IChatUser[] = Array.from({ length: 80 }, (_, index) => ({
    id: `user-${index + 1}`,
    username: `user${index + 1}`,
    isOnline: Math.random() > 0.5,
}));

const ParticipantsList = ({
    visibleCount,
}: IParticipantsListProps): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [showAll, setShowAll] = useState<boolean>(false);

    const visibleUsers = showAll ? fakeUsers : fakeUsers.slice(0, visibleCount);

    const handleToggleShowAll = () => {
        setShowAll(!showAll);
    };
    const handleToggleVisibility = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="participants-container">
            <CloseListButton isOpen={isOpen} onClick={handleToggleVisibility} />
            {isOpen ? (
                <div
                    className={`participants-block ${!isOpen ? "hidden" : ""}`}
                >
                    <h3 className="participants-header">
                        Participants Telegram 2
                    </h3>

                    <div className="divider"></div>
                    <div className="participants-list">
                        {visibleUsers.map((user) => (
                            <div className="participant-card" key={user.id}>
                                <div
                                    className={`status-indicator ${
                                        !user.isOnline ? "offline" : "online"
                                    }`}
                                    title={
                                        !user.isOnline ? "Не в сети" : "В сети"
                                    }
                                />

                                <div className="participant-card-text">
                                    {user.username}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="show-all-button"
                        onClick={handleToggleShowAll}
                    >
                        {!showAll ? "Show more" : "Return"}
                    </button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default ParticipantsList;

import ParticipantCard from "@components/ParticipantCard";
import type { IChatUser } from "@app-types/user";
import { type ReactElement } from "react";

interface IParticipantsListProps {
    visibleCount: number;
    isShowAll?: boolean;
}

const fakeUsers: IChatUser[] = Array.from({ length: 80 }, (_, index) => ({
    id: `user-${index + 1}`,
    username: `user${index + 1}`,
    isOnline: Math.random() > 0.5,
}));

const ParticipantsList = ({
    visibleCount,
    isShowAll,
}: IParticipantsListProps): ReactElement => {
    const visibleUsers = !isShowAll
        ? fakeUsers.slice(0, visibleCount)
        : fakeUsers;
    return (
        <div className="participants-list">
            {visibleUsers.map((user) => (
                <ParticipantCard user={user} />
            ))}
        </div>
    );
};

export default ParticipantsList;

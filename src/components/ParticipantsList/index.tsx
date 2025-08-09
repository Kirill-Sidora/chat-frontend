import ParticipantCard from "@components/ParticipantCard";
import type { IUser } from "@app-types/user";
import { type ReactElement } from "react";
import { useChatDataContext } from "@components/context/СhatDataContext";

interface IParticipantsListProps {
    visibleCount: number;
    isShowAll?: boolean;
}
const ParticipantsList = ({
    visibleCount,
    isShowAll,
}: IParticipantsListProps): ReactElement => {
    const { users } = useChatDataContext();
    const visibleUsers = !isShowAll ? users.slice(0, visibleCount) : users;
    return (
        <div className="participants-list">
            {visibleUsers.map((user: IUser) => (
                <ParticipantCard key={user.id} user={user} />
            ))}
        </div>
    );
};

export default ParticipantsList;

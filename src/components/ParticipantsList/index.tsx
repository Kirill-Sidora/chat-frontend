import ParticipantCard from "@components/ParticipantCard";
import { useChatData } from "@hooks/useChatData/useChatData";
import { useEffect, type ReactElement } from "react";
import type { IUser } from "@app-types/user";

interface IParticipantsListProps {
    visibleCount: number;
    isShowAll?: boolean;
}

const ParticipantsList = ({
    visibleCount,
    isShowAll,
}: IParticipantsListProps): ReactElement => {
    const { users } = useChatData();
    const visibleUsers = !isShowAll ? users.slice(0, visibleCount) : users;

    console.log("VISIBLE USERS: ", visibleUsers);
    return (
        <div className="participants-list">
            {visibleUsers.map((user: IUser) => (
                <ParticipantCard key={user.id} user={user} />
            ))}
        </div>
    );
};

export default ParticipantsList;

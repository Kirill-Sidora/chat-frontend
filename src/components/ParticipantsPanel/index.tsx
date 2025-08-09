import ParticipantsList from "@components/ParticipantsList";
import CustomButton from "@components/CustomButton";
import { useChatDataContext } from "@components/context/СhatDataContext";
import { useState, type ReactElement } from "react";
import "./style.css";

export const typesOfButton = {
    showButton: "show-all-button",
    closeButton: "close-panel",
};

const ParticipantsPanel = (): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isShowAll, setIsShowAll] = useState<boolean>(false);
    const { users } = useChatDataContext();

    const closeButtonText: string = !isOpen ? " ←" : " →";
    const showButtonText: string = !isShowAll ? "Show more" : "Return";
    const stateOfContainer = isOpen ? "initial" : "moved";
    const visibleCount: number = 8;

    const isShowButton = users.length >= visibleCount;

    const handleToggleShowAll = () => {
        setIsShowAll(!isShowAll);
    };
    const handleToggleVisibility = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`participants-container ${stateOfContainer}`}>
            <div className="button-container">
                <CustomButton
                    onClick={handleToggleVisibility}
                    type={typesOfButton.closeButton}
                >
                    {closeButtonText}
                </CustomButton>
            </div>
            <div className="participants-block">
                <h3 className="participants-header">Participants Telegram 2</h3>

                <div className="divider"></div>
                <ParticipantsList
                    visibleCount={visibleCount}
                    isShowAll={isShowAll}
                />
                {isShowButton && (
                    <CustomButton
                        onClick={handleToggleShowAll}
                        type={typesOfButton.showButton}
                    >
                        {showButtonText}
                    </CustomButton>
                )}
            </div>
        </div>
    );
};

export default ParticipantsPanel;

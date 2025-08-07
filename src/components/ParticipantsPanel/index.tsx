import ParticipantsList from "@components/ParticipantsList";
import CustomButton from "@components/CustomButton";
import { useState, type ReactElement } from "react";
import "./style.css";

export const typesOfButton = {
    showButton: "show-all-button",
    closeButton: "close-panel",
};

const ParticipantsPanel = (): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isShowAll, setIsShowAll] = useState<boolean>(false);

    const isVisibleBlock: string = !isOpen ? "hidden" : "";
    const closeButtonText: string = !isOpen ? " ←" : " →";
    const showButtonText: string = !isShowAll ? "Show more" : "Return";
    const stateOfButton = isOpen ? "initial" : "moved";

    const handleToggleShowAll = () => {
        setIsShowAll(!isShowAll);
    };
    const handleToggleVisibility = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="participants-container">
            <div className={`button-container ${stateOfButton}`}>
                <CustomButton
                    onClick={handleToggleVisibility}
                    type={typesOfButton.closeButton}
                >
                    {closeButtonText}
                </CustomButton>
            </div>
            <div className={`participants-block ${isVisibleBlock}`}>
                <h3 className="participants-header">Participants Telegram 2</h3>

                <div className="divider"></div>
                <ParticipantsList visibleCount={8} isShowAll={isShowAll} />
                <CustomButton
                    onClick={handleToggleShowAll}
                    type={typesOfButton.showButton}
                >
                    {showButtonText}
                </CustomButton>
            </div>
        </div>
    );
};

export default ParticipantsPanel;

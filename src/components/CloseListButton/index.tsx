import { type ReactElement } from "react";
import "./styles.css";

interface ICloseButtonProps {
    isListVisible: boolean;
    onClick: () => void;
}

const CloseListButton = ({
    isListVisible,
    onClick,
}: ICloseButtonProps): ReactElement => {
    const handleCLick = (): void => {
        onClick();
    };
    return (
        <div
            className={`close-list-button ${isListVisible ? "open" : "closed"}`}
            onClick={handleCLick}
        >
            <span className="arrow"> {isListVisible ? "→" : "←"}</span>
        </div>
    );
};

export default CloseListButton;

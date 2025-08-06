import { type ReactElement } from "react";
import "./styles.css";

interface ICloseButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const CloseListButton = ({
    isOpen,
    onClick,
}: ICloseButtonProps): ReactElement => {
    const handleCLick = (): void => {
        onClick();
    };
    return (
        <div
            className={`close-list-button ${isOpen ? "opened" : "closed"}`}
            onClick={handleCLick}
        >
            {isOpen ? "→" : "←"}
        </div>
    );
};

export default CloseListButton;

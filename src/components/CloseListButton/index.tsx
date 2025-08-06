import CustomButton from "@components/CustomButton";
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
    return (
        <div className={`close-button-wrapper ${isOpen ? "opened" : "closed"}`}>
            <CustomButton onClick={onClick}>{isOpen ? "→" : "←"}</CustomButton>
        </div>
    );
};

export default CloseListButton;

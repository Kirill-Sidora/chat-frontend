import type { ReactElement } from "react";
import "./styles.css";

interface ICustomButtonProps {
    onClick: () => void;
    children?: string;
    type: string;
    disabled?: boolean;
}

const CustomButton = ({
    onClick,
    children,
    type,
    disabled = false,
}: ICustomButtonProps): ReactElement => {
    return (
        <button
            className={`custom-button ${type} secondary-text`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default CustomButton;

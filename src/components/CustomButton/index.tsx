import type { ReactElement } from "react";
import "./styles.css";

interface ICustomButtonProps {
    onClick: () => void;
    children?: string;
    type: string;
}

const CustomButton = ({
    onClick,
    children,
    type,
}: ICustomButtonProps): ReactElement => {
    return (
        <button
            className={`custom-button ${type} secondary-text`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default CustomButton;

import type { ReactElement, ButtonHTMLAttributes } from "react";
import "./styles.css";

interface ICustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    children?: string;
}

const CustomButton = ({
    onClick,
    children,
}: ICustomButtonProps): ReactElement => {
    return (
        <button className="custom-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default CustomButton;

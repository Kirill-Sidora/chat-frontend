import { ICON_SRC_PREFIX, ICON_SRC_SUFFIX } from "../../utils/constants";
import type { ReactElement } from "react";
import "./style.css";

export interface IIconButtonProps {
    iconSrc: string;
    onClick: () => void;
    height?: string;
    disabled?: boolean;
    className?: string;
    rawSrc?: boolean;
    variant?: "default" | "send";
}

const DEFAULT_HEIGHT = "24px";

const IconButton = ({
    iconSrc,
    onClick,
    height = DEFAULT_HEIGHT,
    disabled = false,
    className = "",
    rawSrc = false,
    variant = "default",
}: IIconButtonProps): ReactElement => {
    const isSend = variant === "send";

    return (
        <button
            className={`icon-button ${isSend ? "send" : ""} ${
                !disabled && isSend ? "active" : ""
            } ${disabled ? "disabled" : ""} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            <img
                src={
                    rawSrc
                        ? iconSrc
                        : ICON_SRC_PREFIX + iconSrc + ICON_SRC_SUFFIX
                }
                height={height}
            />
        </button>
    );
};

export default IconButton;

import { ICON_SRC_PREFIX, ICON_SRC_SUFFIX } from "@utils/constants";
import { type ReactElement } from "react";
import "./style.css";

export interface IIconButtonProps {
    iconSrc: string;
    onClick: () => void | Promise<void>;
    height?: string;
    disabled?: boolean;
    isActive?: boolean;
}

const DEFAULT_HEIGHT = "24px";

const IconButton = ({
    iconSrc,
    onClick,
    height = DEFAULT_HEIGHT,
    disabled = false,
    isActive = false,
}: IIconButtonProps): ReactElement => {

    var className: string = `icon-button ${!isActive ? "" : "active"} ${!disabled ? "" : "disabled"}`;

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            <img
                src={ICON_SRC_PREFIX + iconSrc + ICON_SRC_SUFFIX}
                height={height}
            />
        </button>
    );
};

export default IconButton;
import type { ReactElement } from "react";

export enum IconIds {
    PAPERCLIP_ICON = "paperclip-icon",
    STICKERS_ICON = "stickers-icon",
    SENDING_BUTTON_ICON = "sending-button-icon",
    MICRO_ICON = "micro-icon-disabled",
}

export const ICON_SRC_PREFIX = "src/assets/icons/";
export const ICON_SRC_SUFFIX = ".svg";

export function getRandomId() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2).toString()
    );
}

export const getFormattedTime = (timestamp: number): string => {
    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
};
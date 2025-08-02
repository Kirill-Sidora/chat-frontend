export enum IconIds {
    PAPERCLIP_ICON = "paperclip-icon",
    STICKERS_ICON = "stickers-icon"
}

export const ICON_SRC_PREFIX = "src/assets/icons/";
export const ICON_SRC_SUFFIX = ".svg";

export function getRandomId() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2).toString()
    );
}
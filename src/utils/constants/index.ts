import { TClientMessage, ITextMessage } from "@app-types/message";

export enum IconIds {
    PAPERCLIP_ICON = "paperclip-icon",
    STICKERS_ICON = "stickers-icon",
    SENDING_BUTTON_ICON = "sending-button-icon",
    MICRO_ICON = "micro-icon-disabled",
    MICRO_ICON_ACTIVE = "micro-icon-active",
    SENDING_AUDIO_BUTTON_ICON = "sending-audio-icon",
    DELETE_BUTTON_ICON = "delete-button-icon",
    STOP_AUDIO_BUTTON_ICON = "stop-audio-button-icon",
}

export const typesOfButton = {
    showButton: "show-all-button",
    closePanelButton: "close-panel",
    closeAsideButton: "close-aside",
};

export const ICON_SRC_PREFIX = "src/assets/icons/";
export const ICON_SRC_SUFFIX = ".svg";

export enum ComposerMode {
    TEXT = "text",
    AUDIO = "audio",
}

export interface IIntroSlideData {
    id: number;
    name: string;
    src: string;
    height: number;
    left: string;
    top: string;
    zIndex: number;
}

export const introSlidesImagesData: IIntroSlideData[] = [
    {
        id: 1,
        name: "Telegram Chat Modal.png",
        src: "src/assets/images/intro-slide-1.png",
        height: 900,
        left: "600px",
        top: "200px",
        zIndex: 0,
    },
    {
        id: 2,
        name: "Telegram Chat.png",
        src: "src/assets/images/intro-slide-2.png",
        height: 900,
        zIndex: 1,
        left: "900px",
        top: "150px",
    },
];

export const isValidMessage = (message: string): boolean => {
    return /\S/.test(message);
};

export const isTextMessage = (
    message: TClientMessage
): message is ITextMessage => {
    return message.type === "text";
};

export const getRandomId = (): string => {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2).toString()
    );
};

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

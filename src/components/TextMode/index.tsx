import IconButton from "@components/IconButton";
import MessageInput from "@components/MessageInput";
import FileUploader from "@components/FileUploader";
import type { ReactElement, KeyboardEvent } from "react";
import { IconIds } from "@utils/constants";

interface TextModeProps {
    message: string;
    setMessage: (msg: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextMode = ({
    message,
    setMessage,
    onKeyDown,
}: TextModeProps): ReactElement => {
    return (
        <>
            <FileUploader />
            <MessageInput
                message={message}
                setMessage={setMessage}
                onKeyDown={onKeyDown}
            />

            <IconButton
                iconSrc={IconIds.STICKERS_ICON}
                onClick={() => {}}
                height="24px"
            />
        </>
    );
};

export default TextMode;

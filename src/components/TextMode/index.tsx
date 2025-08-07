import IconButton from "@components/IconButton";
import MessageInput from "@components/MessageInput";
import { IconIds } from "@utils/constants";
import type { ReactElement } from "react";

interface TextModeProps {
    message: string;
    setMessage: (msg: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextMode = ({
    message,
    setMessage,
    onKeyDown,
}: TextModeProps): ReactElement => {
    return (
        <>
            <IconButton
                iconSrc={IconIds.PAPERCLIP_ICON}
                onClick={() => {}}
                height="24px"
            />

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

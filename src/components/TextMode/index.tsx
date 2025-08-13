import IconButton from "@components/IconButton";
import MessageInput from "@components/MessageInput";
import FileUploader from "@components/FileUploader";
import { type ReactElement, type KeyboardEvent } from "react";
import { type IEncodedFileData } from "@app-types/file";
import { IconIds } from "@utils/constants";
import { Fragment } from "react";

interface TextModeProps {
    message: string;
    setMessage: (msg: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    onFileSend: (fileData: IEncodedFileData) => void;
}

const TextMode = ({
    message,
    setMessage,
    onKeyDown,
    onFileSend,
}: TextModeProps): ReactElement => {
    return (
        <Fragment>
            <FileUploader onFileSend={onFileSend}/>

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
        </Fragment>
    );
};

export default TextMode;
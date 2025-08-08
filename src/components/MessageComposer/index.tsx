import TextMode from "@components/TextMode";
import AudioMode from "@components/AudioMode";
import IconButton from "@components/IconButton";
import FileUploader from "@components/FileUploader";
import { useState, type ReactElement, type KeyboardEvent } from "react";
import { ComposerMode, IconIds } from "@utils/constants";
import { isValidMessage } from "@utils/constants";
import "./style.css";

interface IMessageComposerProps {
    onSend: (messageOrAudio: string) => void;
}

const MessageComposer = ({ onSend }: IMessageComposerProps): ReactElement => {
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState<ComposerMode>(ComposerMode.TEXT);

    const handleSendMessage = () => {
        if (isValidMessage(message)) {
            onSend(message);
            setMessage("");
            console.log(message);
        }
    };

    const handleSendOrRecordChecking = () => {
        if (isValid) {
            handleSendMessage();
            return;
        }

        setMode(ComposerMode.AUDIO);
    };

    const handleSendAudio = (audio: Blob) => {
        console.log("audio sended");
        setMode(ComposerMode.TEXT);
    };

    const handleMessageInputKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            handleSendMessage();
        }
    };

    const isValid: boolean = isValidMessage(message);

    return (
        <div className="message-composer-container">
            {mode == ComposerMode.AUDIO && (
                <AudioMode
                    onDiscard={() => setMode(ComposerMode.TEXT)}
                    onFileUpdate={handleSendAudio}
                />
            )}

            {mode == ComposerMode.TEXT && (
                <>
                    <TextMode
                        message={message}
                        setMessage={setMessage}
                        onKeyDown={handleMessageInputKeyDown}
                    />

                    <IconButton
                        iconSrc={
                            !isValid
                                ? IconIds.MICRO_ICON
                                : IconIds.SENDING_BUTTON_ICON
                        }
                        onClick={handleSendOrRecordChecking}
                        isActive={isValid}
                    />
                </>
            )}
        </div>
    );
};

export default MessageComposer;

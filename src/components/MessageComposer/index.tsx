import TextMode from "@components/TextMode";
import AudioMode from "@components/AudioMode";
import IconButton from "@components/IconButton";
import { useState, type ReactElement, type KeyboardEvent } from "react";
import { ComposerMode, IconIds } from "@utils/constants";
import { type IEncodedFileData } from "@app-types/file";
import { isValidMessage } from "@utils/constants";
import "./style.css";

interface IMessageComposerProps {
    onTextSend: (message: string) => void;
    onFileSend: (fileData: IEncodedFileData) => void;
    onAudioSend: (audioData: IEncodedFileData) => void;
}

const MessageComposer = ({ onTextSend, onFileSend, onAudioSend }: IMessageComposerProps): ReactElement => {
    const [message, setMessage] = useState<string>("");
    const [mode, setMode] = useState<ComposerMode>(ComposerMode.TEXT);

    const handleSendMessage = () => {
        if (!isValidMessage(message)) return;

        onTextSend(message);
        setMessage("");
    };

    const handleSendOrRecordChecking = () => {
        if (isValid) {
            setMode(ComposerMode.AUDIO);
            return;
        }

        handleSendMessage();
    };

    const handleSendFile = (fileData: IEncodedFileData) => {
        onFileSend(fileData);
    };

    const handleSendAudio = (audioData: IEncodedFileData) => {
        onAudioSend(audioData);

        setMode(ComposerMode.TEXT);
    };

    const handleMessageInputKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key !== "Enter" || event.shiftKey) return;
        else {
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
                    onAudioSend={handleSendAudio}
                />
            )}

            {mode == ComposerMode.TEXT && (
                <>
                    <TextMode
                        message={message}
                        setMessage={setMessage}
                        onKeyDown={handleMessageInputKeyDown}
                        onFileSend={handleSendFile}
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
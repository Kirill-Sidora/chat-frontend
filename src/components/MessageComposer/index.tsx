import TextMode from "@components/TextMode";
import AudioMode from "@components/AudioMode";
import IconButton from "@components/IconButton";
import { useState, type ReactElement, type KeyboardEvent } from "react";
import { ComposerMode, IconIds } from "@utils/constants";
import { isValidMessage } from "@utils/constants";
import "./style.css";
import type { IEncodedFileData } from "@app-types/file";

interface IMessageComposerProps {
    onTextSend: (message: string) => void;
    onFileSend: (fileData: IEncodedFileData) => void;
    onAudioSend: (audioData: IEncodedFileData) => void;
}

const MessageComposer = ({ onTextSend, onFileSend, onAudioSend }: IMessageComposerProps): ReactElement => {
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState<ComposerMode>(ComposerMode.TEXT);
    
    const canSendTextMessage = isValidMessage(message);

    const handlePrimaryAction = () => {
        if(canSendTextMessage){
            onTextSend(message);
            setMessage("");
            return;
        }

        setMode(ComposerMode.AUDIO);
    }
    
    const handleSendMessage = () => {
        if (canSendTextMessage) {
            onTextSend(message);
            setMessage("");
        }
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
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            handleSendMessage();
        }
    };


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
                            canSendTextMessage
                                ? IconIds.SENDING_BUTTON_ICON
                                : IconIds.MICRO_ICON
                        }
                        onClick={handlePrimaryAction}
                        isActive={canSendTextMessage}
                    />
                </>
            )}
        </div>
    );
};

export default MessageComposer;

import IconButton from "@components/IconButton";
import MessageInput from "@components/MessageInput";
import AudioRecorder from "@components/AudioRecorder";
import { useState, type ReactElement, type KeyboardEvent } from "react";
import { IconIds } from "@utils/constants";
import "./style.css";

interface IMessageComposerProps {
    onSend: (messageOrAudio: string | Blob) => void;
}

const MessageComposer = ({ onSend }: IMessageComposerProps): ReactElement => {
    const [message, setMessage] = useState("");
    const [isAudioMode, setIsAudioMode] = useState(false);

    const isValidMessage = (msg: string): boolean => {
        return /\S/.test(msg);
    };

    const handleSendMessage = () => {
        if (isValidMessage(message)) {
            onSend(message);
            setMessage("");
            console.log(message);
        }
    };

    const handleSendOrRecordChecking = () => {
        if (!isValid) {
            setIsAudioMode(true);
        } else {
            handleSendMessage();
        }
    };

    const handleSendAudio = (audio: Blob) => {
        onSend(audio);
        setIsAudioMode(false);
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
            {!isAudioMode && (
                <IconButton
                    iconSrc={IconIds.PAPERCLIP_ICON}
                    onClick={() => {}}
                    height="24px"
                />
            )}
            {isAudioMode ? (
                <AudioRecorder onSend={handleSendAudio} />
            ) : (
                <>
                    <MessageInput
                        message={message}
                        setMessage={setMessage}
                        onKeyDown={handleMessageInputKeyDown}
                    />
                    <IconButton
                        iconSrc={IconIds.STICKERS_ICON}
                        onClick={() => {}}
                        height="24px"
                    />
                    <IconButton
                        iconSrc={
                            !isValid
                                ? IconIds.MICRO_ICON
                                : IconIds.SENDING_BUTTON_ICON
                        }
                        onClick={() => {
                            handleSendOrRecordChecking();
                        }}
                        variant="send"
                        isActive={isValid}
                    />
                </>
            )}
        </div>
    );
};

export default MessageComposer;

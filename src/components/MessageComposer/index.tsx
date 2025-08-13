import TextMode from "@components/TextMode";
import AudioMode from "@components/AudioMode";
import IconButton from "@components/IconButton";
import { useMessageComposerHandlers } from "@hooks/useMessageComposerHandlers";
import type { MessagesForServerTypes } from "@app-types/serverMessages";
import { ComposerMode, IconIds } from "@utils/constants";
import type { IEncodedFileData } from "@app-types/file";
import type { ReactElement } from "react";
import "./style.css";

interface IMessageComposerProps {
    onSendMessage: (
        type: MessagesForServerTypes,
        data: string | IEncodedFileData
    ) => void;
}

const MessageComposer = ({
    onSendMessage,
}: IMessageComposerProps): ReactElement => {
    const {
        mode,
        message,
        isRecording,
        audioSrc,
        canSendTextMessage,
        setMessage,
        handlePrimaryAction,
        handleSendFile,
        handleSendAudio,
        handleStopRecording,
        handleDiscardAudio,
        handleMessageInputKeyDown,
    } = useMessageComposerHandlers({ onSendMessage });

    const leftPaneComponent = {
        [ComposerMode.TEXT]: (
            <TextMode
                message={message}
                setMessage={setMessage}
                onKeyDown={handleMessageInputKeyDown}
                onFileUpload={handleSendFile}
            />
        ),
        [ComposerMode.AUDIO]: (
            <AudioMode isRecording={isRecording} audioSrc={audioSrc} />
        ),
    };

    const rightPaneComponent = {
        [ComposerMode.TEXT]: (
            <IconButton
                iconSrc={
                    canSendTextMessage
                        ? IconIds.SENDING_BUTTON_ICON
                        : IconIds.MICRO_ICON
                }
                onClick={handlePrimaryAction}
                isActive={canSendTextMessage}
            />
        ),
        [ComposerMode.AUDIO]: isRecording ? (
            <IconButton
                iconSrc={IconIds.MICRO_ICON_ACTIVE}
                onClick={handleStopRecording}
                isActive={true}
            />
        ) : (
            <div className="audio-actions">
                <IconButton
                    iconSrc={IconIds.DELETE_BUTTON_ICON}
                    onClick={handleDiscardAudio}
                />
                <IconButton
                    iconSrc={IconIds.SENDING_AUDIO_BUTTON_ICON}
                    onClick={handleSendAudio}
                />
            </div>
        ),
    };

    return (
        <div className="message-composer-container">
            <div className="composer-left-pane">{leftPaneComponent[mode]}</div>
            <div className="composer-right-pane">
                {rightPaneComponent[mode]}
            </div>
        </div>
    );
};

export default MessageComposer;
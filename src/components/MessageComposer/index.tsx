import TextMode from "@components/TextMode";
import AudioMode from "@components/AudioMode";
import IconButton from "@components/IconButton";
import { useMessageComposerHandlers } from "@hooks/useMessageComposerHandlers";
import { ComposerMode, IconIds } from "@utils/constants";
import type { IEncodedFileData } from "@app-types/file";
import type { ReactElement } from "react";
import "./style.css";

interface IMessageComposerProps {
    onSendMessage: (type: string, data: string | IEncodedFileData) => void;
}

const MessageComposer = ({
    onSendMessage,
}: IMessageComposerProps): ReactElement => {
    const {
        mode,
        isRecording,
        audioSrc,
        textModeProps,
        primaryButtonProps,
        stopRecordingButtonProps,
        audioActionButtonsProps,
    } = useMessageComposerHandlers({ onSendMessage });

    const leftPaneComponent = {
        [ComposerMode.TEXT]: <TextMode {...textModeProps} />,
        [ComposerMode.AUDIO]: (
            <AudioMode isRecording={isRecording} audioSrc={audioSrc} />
        ),
    };

    const rightPaneComponent = {
        [ComposerMode.TEXT]: <IconButton {...primaryButtonProps} />,
        [ComposerMode.AUDIO]: !isRecording ? (
            <div className="audio-actions">
                <IconButton
                    iconSrc={IconIds.DELETE_BUTTON_ICON}
                    onClick={audioActionButtonsProps.onDiscard}
                />
                <IconButton
                    iconSrc={IconIds.SENDING_AUDIO_BUTTON_ICON}
                    onClick={audioActionButtonsProps.onSend}
                />
            </div>
        ) : (
            <IconButton {...stopRecordingButtonProps} />
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
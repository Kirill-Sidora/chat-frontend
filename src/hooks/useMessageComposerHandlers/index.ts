import { ComposerMode, IconIds, isValidMessage } from "@utils/constants";
import useAudioInputBox from "@hooks/useAudioInputBox/useAudioInputBox";
import { MessagesForServerTypes } from "@app-types/serverMessages";
import { useState, type KeyboardEvent } from "react";
import type { IEncodedFileData } from "@app-types/file";
import FileManager from "@services/FileManager";

interface IUseMessageComposerHandlersProps {
    onSendMessage: (
        type: MessagesForServerTypes,
        data: string | IEncodedFileData
    ) => void;
}

export const useMessageComposerHandlers = ({
    onSendMessage,
}: IUseMessageComposerHandlersProps) => {
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState<ComposerMode>(ComposerMode.TEXT);

    const {
        startRecording,
        stopRecording,
        discardRecording,
        isRecording,
        audioSrc,
        blob,
    } = useAudioInputBox();

    const canSendTextMessage = isValidMessage(message);

    const handleSendText = () => {
        if (!canSendTextMessage) {
            return;
        }
        onSendMessage(MessagesForServerTypes.TEXT_MESSAGE, message);
        setMessage("");
    };

    const handleSwitchToAudioMode = () => {
        setMode(ComposerMode.AUDIO);
        startRecording();
    };

    const handleSendFile = (fileData: IEncodedFileData) => {
        onSendMessage(MessagesForServerTypes.FILE_MESSAGE, fileData);
    };

    const handleSendAudio = async () => {
        if (!blob) {
            return;
        }
        try {
            const audioData = await FileManager.blobToBase64Data(blob);
            onSendMessage(MessagesForServerTypes.AUDIO_MESSAGE, audioData);
        } catch (error) {
            console.error("Failed to encode audio:", error);
        } finally {
            discardRecording();
            setMode(ComposerMode.TEXT);
        }
    };

    const handleStopRecording = () => {
        stopRecording();
    };

    const handleDiscardAudio = () => {
        discardRecording();
        setMode(ComposerMode.TEXT);
    };

    const handlePrimaryAction = () => {
        if (!canSendTextMessage) {
            handleSwitchToAudioMode();
            return;
        }
        handleSendText();
    };

    const handleMessageInputKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key !== "Enter" || event.shiftKey) {
            return;
        }
        event.preventDefault();
        handleSendText();
    };

    return {
        mode,
        isRecording,
        audioSrc,
        textModeProps: {
            message,
            setMessage,
            onKeyDown: handleMessageInputKeyDown,
            onFileSend: handleSendFile,
        },
        primaryButtonProps: {
            iconSrc: canSendTextMessage
                ? IconIds.SENDING_BUTTON_ICON
                : IconIds.MICRO_ICON,
            onClick: handlePrimaryAction,
            isActive: canSendTextMessage,
        },
        stopRecordingButtonProps: {
            iconSrc: IconIds.MICRO_ICON_ACTIVE,
            onClick: handleStopRecording,
            isActive: true,
        },
        audioActionButtonsProps: {
            onDiscard: handleDiscardAudio,
            onSend: handleSendAudio,
        },
    };
};
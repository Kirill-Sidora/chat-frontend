import FileManager from "@services/FileManager";
import useAudioInputBox from "@hooks/useAudioInputBox/useAudioInputBox";
import { MessagesForServerTypes } from "@app-types/serverMessages";
import { ComposerMode, isValidMessage } from "@utils/constants";
import type { IEncodedFileData } from "@app-types/file";
import { useState, type KeyboardEvent } from "react";

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
            onSendMessage(MessagesForServerTypes.FILE_MESSAGE, audioData);
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
    };
};
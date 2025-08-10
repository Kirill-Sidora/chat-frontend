import IconButton from "@components/IconButton";
import Indication from "@components/Indication";
import useAudioInputBox from "@hooks/useAudioInputBox/useAudioInputBox";
import { Fragment, useEffect, type ReactElement } from "react";
import { IconIds } from "@utils/constants";
import "./style.css";
import FileManager from "@services/FileManager";
import type { IEncodedFileData } from "@app-types/file";

interface IAudioInputBoxProps {
    onAudioSend: (fileData: IEncodedFileData) => void;
    onDiscard?: () => void;
}

const AudioInputBox = ({
    onAudioSend,
    onDiscard,
}: IAudioInputBoxProps): ReactElement => {
    const {
        startRecording,
        stopRecording,
        discardRecording,
        cleanupRecording,
        isRecording,
        audioSrc,
        blob,
        isUploading,
    } = useAudioInputBox();

    const handleSend = async () => {
        if (!blob) {
            return;
        };

        try {
            const encodingAudio: IEncodedFileData = await FileManager.blobToBase64Data(blob);

            onAudioSend(encodingAudio);
        } catch(error) {
            const currentError = error as Error;

            console.error("Failed encode audio: ", currentError.message);
        }
    };

    const handleDiscard = () => {
        discardRecording();

        if (onDiscard) {
            onDiscard();
        }
    };

    useEffect(() => {
        startRecording();
        return () => {
            cleanupRecording();
        };
    }, []);

    return (
        <div className="audio-recorder">
            {!isRecording && !isUploading && (
                <div className="recording-start">
                    <IconButton
                        iconSrc={IconIds.MICRO_ICON}
                        onClick={startRecording}
                    />
                </div>
            )}

            {isRecording && (
                <div className="recording">
                    <Indication />

                    <IconButton
                        iconSrc={IconIds.MICRO_ICON_ACTIVE}
                        onClick={stopRecording}
                        isActive={true}
                    />
                </div>
            )}

            {isUploading && (
                <Fragment>
                    <audio controls src={audioSrc || undefined} />
                    <div className="recorded-last-actions">
                        <div className="controllers">
                            <IconButton
                                iconSrc={IconIds.SENDING_AUDIO_BUTTON_ICON}
                                onClick={handleSend}
                            />
                            <IconButton
                                iconSrc={IconIds.DELETE_BUTTON_ICON}
                                onClick={handleDiscard}
                            />
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default AudioInputBox;

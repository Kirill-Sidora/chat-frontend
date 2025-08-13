import IconButton from "@components/IconButton";
import Indication from "@components/Indication";
import FileManager from "@services/FileManager";
import useAudioInputBox from "@hooks/useAudioInputBox/useAudioInputBox";
import { Fragment, useEffect, type ReactElement } from "react";
import { type IEncodedFileData } from "@app-types/file";
import { IconIds } from "@utils/constants";
import "./style.css";

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
        if (!blob) { return; }

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

        if (!onDiscard) { return; }
        
        onDiscard();
    };

    useEffect(() => {
        startRecording();

        return () => { cleanupRecording() };
    }, []);

    return (
        <div className="audio-recorder">
            {isRecording ? (
                <div className="recording">
                    <Indication />

                    <IconButton
                        iconSrc={IconIds.MICRO_ICON_ACTIVE}
                        onClick={stopRecording}
                        isActive={true}
                    />
                </div>
            ) : isUploading ? (
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
            ) : (
                <div className="recording-start">
                    <IconButton
                        iconSrc={IconIds.MICRO_ICON}
                        onClick={startRecording}
                    />
                </div>
            )}
        </div>
    );
};

export default AudioInputBox;
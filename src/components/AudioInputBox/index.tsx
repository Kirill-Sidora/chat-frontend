import IconButton from "@components/IconButton";
import Indication from "@components/Indication";
import useAudioInputBox from "@hooks/useAudioInputBox/useAudioInputBox";
import { Fragment, useEffect, type ReactElement } from "react";
import { IconIds } from "@utils/constants";
import "./style.css";

interface IAudioInputBoxProps {
    onFileUpdate: (audio: Blob) => void;
    onDiscard?: () => void;
}

const AudioInInputBox = ({
    onFileUpdate,
    onDiscard,
}: IAudioInputBoxProps): ReactElement => {
    const {
        startRecording,
        stopRecording,
        discardRecording,
        cleanupRecording,
        isRecording,
        blob,
        audioSrc,
    } = useAudioInputBox({ onFileUpdate });

    const isUploading = !!blob && !!audioSrc;

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
                                iconSrc={IconIds.DELETE_BUTTON_ICON}
                                onClick={() => {
                                    discardRecording();
                                    onDiscard?.();
                                }}
                            />
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default AudioInInputBox;

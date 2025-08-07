import Timer from "@components/Timer";
import IconButton from "@components/IconButton";
import useAudioRecording from "@hooks/useAudioRecording/useAudioRecording";
import { Fragment, useEffect, type ReactElement } from "react";
import { IconIds } from "@utils/constants";
import "./style.css";


interface IAudioRecorderProps {
    onSend: (audio: Blob) => void;
}

const AudioRecorder = ({ onSend }: IAudioRecorderProps): ReactElement => {
    const {
        startRecording,
        stopRecording,
        discardRecording,
        sendRecording,
        cleanupRecording,
        isRecording,
        blob,
        audioSrc,
    } = useAudioRecording({ onSend });

    useEffect(() => {
        startRecording();
        return () => {
            cleanupRecording();
        };
    }, []);

    return (
        <div className="audio-recorder">
            {!isRecording && !blob && (
                <div className="recording-start">
                    <IconButton
                        iconSrc={IconIds.MICRO_ICON}
                        onClick={startRecording}
                    />
                </div>
            )}

            {isRecording && (
                <div className="recording">
                    <div className="indicator">
                        <span className="red-dot"></span>
                        <Timer isActive = {true} />
                    </div>

                    <IconButton
                        iconSrc={IconIds.MICRO_ICON_ACTIVE}
                        onClick={stopRecording}
                        isActive = {true}
                    />
                </div>
            )}

            {blob && (
                <Fragment>
                    <audio controls src={audioSrc || undefined} />
                    <div className="recorded-last-actions">
                        <div className="controllers">
                            <IconButton
                                iconSrc={IconIds.SENDING_AUDIO_BUTTON_ICON}
                                onClick={sendRecording}
                            />

                            <IconButton
                                iconSrc={IconIds.DELETE_BUTTON_ICON}
                                onClick={discardRecording}
                            />
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default AudioRecorder;

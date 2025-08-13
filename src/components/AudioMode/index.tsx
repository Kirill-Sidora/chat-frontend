import Indication from "@components/Indication";
import AudioPreview from "@components/AudioPreview";
import type { ReactElement } from "react";

interface IAudioModeProps {
    isRecording: boolean;
    audioSrc: string | null;
}

const AudioMode = ({
    isRecording,
    audioSrc,
}: IAudioModeProps): ReactElement => {
    if (!isRecording && !audioSrc) {
        return <></>;
    }

    if (!isRecording) {
        return <AudioPreview src={audioSrc} />;
    }

    return (
        <div className="recording-indicator">
            <Indication />
        </div>
    );
};

export default AudioMode;

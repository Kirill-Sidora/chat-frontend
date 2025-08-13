import type { ReactElement } from "react";
import "./style.css";

interface IAudioPreviewProps {
    src: string | null;
}

const AudioPreview = ({ src }: IAudioPreviewProps): ReactElement => {
    if (!src) {
        return <></>;
    }

    return (
        <div className="audio-preview">
            <audio controls src={src} />
        </div>
    );
};

export default AudioPreview;
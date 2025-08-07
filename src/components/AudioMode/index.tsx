import AudioInputBox from "@components/AudioInputBox";
import type { ReactElement } from "react";

interface AudioModeProps {
    onFileUpdate: (blob: Blob) => void;
    onDiscard: () => void;
}

const AudioMode = ({
    onFileUpdate,
    onDiscard,
}: AudioModeProps): ReactElement => {
    return <AudioInputBox onFileUpdate={onFileUpdate} onDiscard={onDiscard} />;
};

export default AudioMode;

import AudioInputBox from "@components/AudioInputBox";
import { type IEncodedFileData } from "@app-types/file";
import { type ReactElement } from "react";

interface AudioModeProps {
    onAudioSend: (fileData: IEncodedFileData) => void;
    onDiscard: () => void;
}

const AudioMode = ({
    onAudioSend,
    onDiscard,
}: AudioModeProps): ReactElement => {
    return <AudioInputBox onAudioSend={onAudioSend} onDiscard={onDiscard} />;
};

export default AudioMode;

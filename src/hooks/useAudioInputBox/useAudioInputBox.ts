import { useEffect, useState } from "react";

interface IUseAudioInputBoxProps {
    onFileUpdate: (audio: Blob) => void;
}

const useAudioInputBox = ({ onFileUpdate }: IUseAudioInputBoxProps) => {
    const [messageRecorder, setMessageRecorder] =
        useState<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [duration, setDuration] = useState(0);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [durationID, setDurationID] = useState<number | null>(null);

    const cleanupRecording = () => {
        if (!messageRecorder) return;

        messageRecorder.stop();

        if (durationID) {
            clearInterval(durationID);
            setDurationID(null);
        }
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        recorder.onstop = () => {
            const fullBlob = new Blob(chunks, { type: "audio" });
            setBlob(fullBlob);
        };

        recorder.start();
        setMessageRecorder(recorder);
        setIsRecording(true);
        setDuration(0);

        const id = window.setInterval(() => {
            setDuration((d) => d + 0.1);
        }, 100);

        setDurationID(id);

        console.log("Start Recording");
    };

    const stopRecording = () => {
        cleanupRecording();
        setIsRecording(false);
        console.log("Stoooop, wait a minute");
    };

    const discardRecording = () => {
        setBlob(null);
        setDuration(0);
        setAudioSrc(null);
        setIsRecording(false);
        console.log("you discarded your record");
    };

    useEffect(() => {
        if (!blob) {
            setAudioSrc(null);
            return;
        }

        const url = URL.createObjectURL(blob);
        setAudioSrc(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [blob]);

    const isUploading = !!blob && !!audioSrc;

    return {
        cleanupRecording,
        startRecording,
        stopRecording,
        discardRecording,
        isRecording,
        blob,
        duration,
        audioSrc,
        isUploading,
    };
};

export default useAudioInputBox;

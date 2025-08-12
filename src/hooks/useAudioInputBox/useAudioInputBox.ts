import { useState } from "react";

const useAudioInputBox = () => {
    const [messageRecorder, setMessageRecorder] = useState<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [duration, setDuration] = useState<GLfloat>(0);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [durationID, setDurationID] = useState<number | null>(null);

    const cleanupRecording = () => {
        if (!messageRecorder) return;

        messageRecorder.stream.getTracks().forEach(track => track.stop());
        messageRecorder.stop();

        if (durationID) {
            clearInterval(durationID);
            setDurationID(null);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            
            const recorder = new MediaRecorder(stream);

            const chunks: Blob[] = [];

            recorder.ondataavailable = (event) => {
                chunks.push(event.data);
            };

            recorder.onstop = () => {
                const fullBlob = new Blob(chunks, { type: "audio/mp4" });
                setBlob(fullBlob);
                const url = URL.createObjectURL(fullBlob);
                setAudioSrc(url);
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
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const stopRecording = () => {
        cleanupRecording();
        setIsRecording(false);
        console.log("Stoooop, wait a minute");
    };

    const discardRecording = () => {
        if (audioSrc) {
            URL.revokeObjectURL(audioSrc);
        }
        setBlob(null);
        setDuration(0);
        setAudioSrc(null);
        setIsRecording(false);
        console.log("you discarded your record");
    };

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
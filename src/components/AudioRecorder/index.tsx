import IconButton from "@components/IconButton";
import { Fragment, useEffect, useState, type ReactElement } from "react";
import { IconIds } from "@utils/constants";
import "./style.css";

interface IAudioRecorderProps {
    onSend: (audio: Blob) => void;
}

const AudioRecorder = ({ onSend }: IAudioRecorderProps): ReactElement => {
    const [messageRecorder, setMessageRecorder] =
        useState<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [duration, setDuration] = useState(0);
    const [durationID, setDurationID] = useState<number | null>(null);

    const cleanupRecording = () => {
        if (messageRecorder && messageRecorder.state === "recording") {
            messageRecorder.stop();
        }

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
            setDuration((d) => d + 1);
        }, 1000);

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
        setIsRecording(false);
        console.log("you discarded your record");
        sendRecording();
    };

    const sendRecording = () => {
        if (blob) {
            onSend(blob);
            console.log("Your record sended");

            discardRecording();
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
            {!isRecording && !blob && (
                <div className="recording-start">
                    <p>Duration: {duration}s.</p>

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
                        <p>Duration: {duration}s</p>
                    </div>

                    <IconButton
                        iconSrc={IconIds.STOP_AUDIO_BUTTON_ICON}
                        onClick={stopRecording}
                    />
                </div>
            )}

            {blob && (
                <Fragment>
                    <audio controls src={URL.createObjectURL(blob)} />
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

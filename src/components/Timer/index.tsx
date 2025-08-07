import { useEffect, useRef, useState, type ReactElement } from "react";

interface ITimerProps {
    isActive: boolean;
}

const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const tenths = Math.floor((ms % 1000) / 100);

    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");
    const msStr = tenths.toString(); 

    return `${mm}:${ss}:${msStr}`;
};

const Timer = ({ isActive }: ITimerProps): ReactElement => {
    const [duration, setDuration] = useState(0);
    const durationRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive) {
            const start = Date.now() - duration;

            durationRef.current = window.setInterval(() => {
                const elapsed = Date.now() - start;
                setDuration(elapsed);
            }, 100);
        } else {
            if (durationRef.current !== null) {
                clearInterval(durationRef.current);
                durationRef.current = null;
            }
        }

        return () => {
            if (durationRef.current !== null) {
                clearInterval(durationRef.current);
            }
        };
    }, [isActive]);

    return <div>{formatDuration(duration)}</div>;
};

export default Timer;

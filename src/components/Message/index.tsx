import { ClientMessagesTypes, type IAudioMessage, type IFileMessage, type ITextMessage, type TClientMessage } from "@app-types/message";
import { Fragment, useEffect, useRef, useState, type ReactElement } from "react";
import "./style.css";

interface IClientMessageProps {
    message: TClientMessage;
}

interface IFileMessageProps {
    message: IFileMessage;
}

interface ITextMessageProps {
    message: ITextMessage;
}

interface IAudioMessageProps {
    message: IAudioMessage;
}

const FileMessage = ({ message }: IFileMessageProps): ReactElement => {
    const handleDownloadFile = () => {
        const link = document.createElement('a');

        link.href = message.fileData.src;

        link.download = message.fileData.name;

        document.body.appendChild(link);
        
        link.click();

        document.body.removeChild(link);
    };

    return (
        <div className="file-message-container" onClick={handleDownloadFile}>
            <div className="file-preview">
                <img 
                    src={message.fileData.src} 
                    alt="message-image" 
                    className="file-image"
                />

                <div className="file-info">
                    <div className="file-name">{message.fileData.name}</div>
                    <div className="file-size-time">
                        <span className="file-size">
                            {Math.round(message.fileData.size / 1024)} KB
                        </span>
                        <span className="file-time">{message.time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AudioMessage = ({ message }: IAudioMessageProps): ReactElement => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => {
            setIsPlaying(true);
            setHasEnded(false);
        };

        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setHasEnded(true);
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlayback = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    const formatFileSize = (bytes: number) => {
        return `${Math.round(bytes / 1024)} KB`;
    };

    const getIconSrc = () => {
        if (hasEnded) return "/src/assets/icons/play-audio-message-icon.svg";
        return isPlaying 
            ? "/src/assets/icons/stop-audio-message-icon.svg" 
            : "/src/assets/icons/play-audio-message-icon.svg";
    };

    return (
        <div className={`audio-message-container ${message.isMine ? 'mine' : 'other'}`}>
            <div className="audio-content">
                <button 
                    className="audio-icon-button"
                    onClick={togglePlayback}
                >
                    <img 
                        src={getIconSrc()} 
                        alt={isPlaying ? "Stop" : "Play"} 
                        className="audio-icon"
                    />
                </button>
                
                <div className="audio-info">
                    <span className="audio-file-size">
                        {formatFileSize(message.fileData.size)}
                    </span>
                    <span className="audio-time">
                        {message.time}
                    </span>
                </div>
            </div>

            <audio
                ref={audioRef}
                src={message.fileData.src}
                preload="none"
                onEnded={() => setHasEnded(true)}
            />
        </div>
    );
};

const TextMessage = ({ message }: ITextMessageProps): ReactElement => {
    return (
        <Fragment>
            <div className="message-text secondary-text">{message.text}</div>
            <div className="message-time meta-text">{message.time}</div>
        </Fragment>
    );
};

const messageElementByType: Record<ClientMessagesTypes, any> = {
    [ClientMessagesTypes.TEXT]: TextMessage,
    [ClientMessagesTypes.FILE]: FileMessage,
    [ClientMessagesTypes.AUDIO]: AudioMessage,
};

const ClientMessage = ({ message }: IClientMessageProps): ReactElement => {
    const CurrentMessageElement = messageElementByType[message.type];

    return (
        <div className={`message ${!message.isMine ? "other" : "mine"} ${ message.type }`}>
            {!message.isMine && <div className="sender">{message.sender}</div>}

            <CurrentMessageElement message={message} />
        </div>
    );
};

export default ClientMessage;
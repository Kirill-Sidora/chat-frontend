class AudioPlayer {
    public static playSound = (
        sound: HTMLAudioElement,
    ) => {
        sound.play();
    };
}

export default AudioPlayer;
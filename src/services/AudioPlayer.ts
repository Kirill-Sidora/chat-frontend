import { SOUND_SRC_PREFIX } from "@utils/constants";

class AudioPlayer {
    public static playSound = (
        sound: string
    ) => {
        new Audio(SOUND_SRC_PREFIX + sound).play();
        return;
    };
}

export default AudioPlayer;
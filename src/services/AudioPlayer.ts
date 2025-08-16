import { MessagesFromServerTypes, TServerMessages } from "@app-types/serverMessages";
import { SOUND_SRC_PREFIX } from "@utils/constants";
import { SoundIds } from "@utils/constants";

class AudioPlayer {
    public static playSound = (
        sound: string
    ) => {
        new Audio(SOUND_SRC_PREFIX + sound).play();
        return;
    };

    public static triggerNotificationSound = (
        data: TServerMessages,
        username: string
    ) => {
        if (data.type === MessagesFromServerTypes.MESSAGE && username !== data.sender)
        {
            AudioPlayer.playSound(SoundIds.NEW_MESSAGE);
        }
    }
}

export default AudioPlayer;
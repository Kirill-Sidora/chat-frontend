import { MessagesFromServerTypes, TServerMessages } from "@app-types/serverMessages";
import { SOUND_SRC_PREFIX, SoundIds } from "@utils/constants";

class AudioPlayer {
    public static playSound = (
        sound: string
    ) => {
        new Audio(SOUND_SRC_PREFIX + sound).play();
    };

    public static triggerNotificationSound = (
        data: TServerMessages,
        username: string,
    ) => {
        if(data.type == MessagesFromServerTypes.MESSAGE && data.message.sender != username) {
            AudioPlayer.playSound(SoundIds.NEW_MESSAGE);
        };
        
        if(data.type == MessagesFromServerTypes.USER_STATUS_CHANGED && data.isOnline == false && data.username != username) {
            AudioPlayer.playSound(SoundIds.USER_DISCONNECTED);
        } else if (data.type == MessagesFromServerTypes.USER_STATUS_CHANGED && data.isOnline == true && data.username != username) {
            AudioPlayer.playSound(SoundIds.USER_CONNECTED);
        };
    };
}

export default AudioPlayer;
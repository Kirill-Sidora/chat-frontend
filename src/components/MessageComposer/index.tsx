import IconButton from "@components/IconButton";
import MessageInput from "@components/MessageInput";
import { useState, type ReactElement, type KeyboardEvent } from "react";
import { IconIds, isValidMessage } from "@utils/constants";
import "./style.css";

interface IMessageComposerProps {
    onSend: (message: string) => void;
}

const MessageComposer = ({ onSend }: IMessageComposerProps): ReactElement => {
    const [message, setMessage] = useState<string>("");

    const handleSendMessage = () => {
        if (isValidMessage(message)) {
            onSend(message);
            setMessage("");
        }
    };

    const handleMessageInputKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            handleSendMessage();
        }
    };

    const isValid: boolean = isValidMessage(message);

    return (
        <div className="message-composer-container">
            <IconButton
                iconSrc={IconIds.PAPERCLIP_ICON}
                onClick={() => {}}
                height="24px"
            />
            <MessageInput
                message={message}
                setMessage={setMessage}
                onKeyDown={handleMessageInputKeyDown}
            />
            <IconButton
                iconSrc={IconIds.STICKERS_ICON}
                onClick={() => {}}
                height="24px"
            />
            <IconButton
                iconSrc={
                    !isValid ? IconIds.MICRO_ICON : IconIds.SENDING_BUTTON_ICON
                }
                onClick={handleSendMessage}
                disabled={!isValid}
                variant="send"
                isActive={isValid}
            />
        </div>
    );
};

export default MessageComposer;

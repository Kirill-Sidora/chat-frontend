import EmojiPicker from "emoji-picker-react";
import FileManager from "@services/FileManager";
import IconButton from "@components/IconButton";
import ModalWindow from "@components/ModalWindow";
import MessageInput from "@components/MessageInput";
import FileUploader from "@components/FileUploader";
import ImageModalWindowContent from "@components/ImageModalWindowContent";
import {
    type ReactElement,
    type KeyboardEvent,
    useState,
    Fragment,
    Dispatch,
    SetStateAction,
} from "react";
import type { IEncodedFileData } from "@app-types/file";
import { EmojiClickData } from "emoji-picker-react";
import { Categories } from "emoji-picker-react";
import { IconIds } from "@utils/constants";

interface ITextModeProps {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    onFileUpload: (fileData: IEncodedFileData) => void;
}

const TextMode = ({
    message,
    setMessage,
    onKeyDown,
    onFileUpload,
}: ITextModeProps): ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

    const openEmojiPicker = (): void => {
        setIsPickerOpen(!isPickerOpen);
    }

    const handleEmojiClick = (emojiData: EmojiClickData): void => {
        setMessage((prevText) => prevText + emojiData.emoji!);
    }

    const handleFileSelected = (file: File | null) => {
        setSelectedFile(file);

        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFile(null);
    };

    const handleFileSend = async () => {
        if (!selectedFile) {
            return;
        }

        try {
            const blob = new Blob([selectedFile], { type: selectedFile.type });

            const encodedFileData: IEncodedFileData =
                await FileManager.blobToBase64Data(blob, selectedFile.name);

            onFileUpload(encodedFileData);
        } catch (error) {
            const currenError = error as Error;

            console.error("Failed encode file: ", currenError);
        } finally {
            handleCloseModal();
        }
    };

    return (
        <Fragment>
            <FileUploader onFileSelected={handleFileSelected} />

            <MessageInput
                message={message}
                setMessage={setMessage}
                onKeyDown={onKeyDown}
            />

            <IconButton
                iconSrc={IconIds.STICKERS_ICON}
                onClick={() => {openEmojiPicker()}}
                height="24px"
            />

            {isPickerOpen && (
                <div style={{ position: "absolute", top: "320px", left: 40}}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} categories={[{ name: "Emoji", category: Categories.SMILEYS_PEOPLE}]}/>
                </div>
            )}

            {isModalOpen && (
                <ModalWindow>
                    <ImageModalWindowContent
                        file={selectedFile!}
                        onClose={handleCloseModal}
                        onSend={handleFileSend}
                    />
                </ModalWindow>
            )}
        </Fragment>
    );
};

export default TextMode;
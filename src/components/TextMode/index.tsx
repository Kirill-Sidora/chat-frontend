import IconButton from "@components/IconButton";
import MessageInput from "@components/MessageInput";
import FileUploader from "@components/FileUploader";
import { type ReactElement, type KeyboardEvent, useState } from "react";
import { IconIds } from "@utils/constants";
import type { IEncodedFileData } from "@app-types/file";
import FileManager from "@services/FileManager";
import ModalWindow from "@components/ModalWindow";
import ImageModalWindowContent from "@components/ImageModalWindowContent";

interface ITextModeProps {
    message: string;
    setMessage: (msg: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    onFileSend: (fileData: IEncodedFileData) => void;
}

const TextMode = ({
    message,
    setMessage,
    onKeyDown,
    onFileSend,
}: ITextModeProps): ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] =useState<File | null>(null);
    
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

            onFileSend(encodedFileData);
        } catch (error) {
            const currenError = error as Error;

            console.error("Failed encode file: ", currenError);
        } finally {
            handleCloseModal();
        }
    } ;

    return (
        <>
            <FileUploader 
                onFileSelected={handleFileSelected}
            />

            <MessageInput
                message={message}
                setMessage={setMessage}
                onKeyDown={onKeyDown}
            />

            <IconButton
                iconSrc={IconIds.STICKERS_ICON}
                onClick={() => {}}
                height="24px"
            />

            {isModalOpen && (
                <ModalWindow>
                    <ImageModalWindowContent 
                        file={selectedFile!}
                        onClose={handleCloseModal}
                        onSend={handleFileSend}
                    />
                </ModalWindow>
            )}
        </>
    );
};

export default TextMode;

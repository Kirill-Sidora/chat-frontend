import IconButton from "@components/IconButton";
import ModalWindow from "@components/ModalWindow";
import { useFileUpload } from "@hooks/useFileUpload";
import { Fragment, type ReactElement } from "react";
import { IconIds } from "@utils/constants";
import ModalWindowContent from "@components/ImageModalWindowContent";
import type { IEncodedFileData } from "@app-types/file";
import FileManager from "@services/FileManager";

export interface IFileUploaderProps {
    onFileSend: (fileData: IEncodedFileData) => void;
}

const FileUploader = ({ onFileSend }: IFileUploaderProps): ReactElement => {
    const { file, clear, isFileUpload, setIsFileUpload, handleUploadClick } =
        useFileUpload({
            type: "file",
            accept: ".jpg, .jpeg, .png",
            multiple: false,
        });

    const handleSend = async () => {
        if (!isFileUpload || !file) return;

        try {
            const blob = new Blob([file], { type: file.type });

            const encodedFileData: IEncodedFileData =
                await FileManager.blobToBase64Data(blob, file.name);

            onFileSend(encodedFileData);
        } catch (error) {
            const currenError = error as Error;

            console.error("Failed encode file: ", currenError);
        } finally {
            clear();
        }
    };

    return (
        <Fragment>
            <IconButton
                iconSrc={IconIds.PAPERCLIP_ICON}
                onClick={() => handleUploadClick()}
                height="24px"
            />

            {isFileUpload && (
                <ModalWindow>
                    <ModalWindowContent
                        file={file!}
                        onClose={() => setIsFileUpload(false)}
                        onSend={handleSend}
                    />
                </ModalWindow>
            )}
        </Fragment>
    );
};

export default FileUploader;

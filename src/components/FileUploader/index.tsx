import IconButton from "@components/IconButton";
import { useFileUpload } from "@hooks/useFileUpload";
import { useEffect, type ReactElement } from "react";
import { IconIds } from "@utils/constants";

export interface IFileUploaderProps {
    onFileSelected: (file: File | null) => void;
}

const FileUploader = ({ onFileSelected }: IFileUploaderProps): ReactElement => {
    const { file, clear, handleUploadClick } = useFileUpload({
        type: "file",
        accept: ".jpg, .jpeg, .png",
        multiple: false,
    });

    useEffect(() => {
        if (!file) return;

        onFileSelected(file);

        clear();
    }, [file, onFileSelected, clear]);

    return (
        <IconButton
            iconSrc={IconIds.PAPERCLIP_ICON}
            onClick={() => handleUploadClick()}
            height="24px"
        />
    );
};

export default FileUploader;
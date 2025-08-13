import FileManager from "@services/FileManager";
import { useState } from "react";

interface IUseFileUploadProps {
    type: string;
    accept: string;
    multiple: boolean;
}

interface IUseFileUploadReturn {
    file: File | null;
    fileSrc: string | null;
    clear: () => void;
    isFileUpload: boolean;
    setIsFileUpload: (value: boolean) => void;
    handleUploadClick: () => Promise<void>;
}

const fileManager = new FileManager();

export const useFileUpload = ({
    type,
    accept,
    multiple
}: IUseFileUploadProps): IUseFileUploadReturn => {
    const [file, setFile] = useState<File | null>(null);
    const [fileSrc, setFileSrc] = useState<string | null>(null);
    const [isFileUpload, setIsFileUpload] = useState<boolean>(false);

    const handleUploadClick = async () => {
        const uploadedFile = await fileManager.uploadFile({ type, accept, multiple });

        if (!uploadedFile) return;

        const fileSrc = URL.createObjectURL(uploadedFile);

        setFile(uploadedFile);
        setFileSrc(fileSrc);
        setIsFileUpload(true);
    };

    const clear = () => {
        if (fileSrc) {
            URL.revokeObjectURL(fileSrc);
        }
        
        setFile(null);
        setFileSrc(null);
        setIsFileUpload(false);
    };
    
    return {
        file,
        fileSrc,
        clear,
        isFileUpload,
        setIsFileUpload,
        handleUploadClick
    };
};
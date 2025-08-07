import { useState } from "react";

interface IUseFileUploadProps {
    type: string,
    accept: string,
    multiple: boolean
}

interface IUseFileUploadReturn {
    file: File | null,
    fileSrc: string | null,
    clear: () => void,
    isFileUpload: boolean,
    setIsFileUpload: (value: boolean) => void,
    handleUploadClick: () => Promise<void>
}

export const useFileUpload = ({
    type,
    accept,
    multiple
}: IUseFileUploadProps): IUseFileUploadReturn => {
    const [file, setFile] = useState<File | null>(null);
    const [fileSrc, setFileSrc] = useState<string | null>(null);
    const [isFileUpload, setIsFileUpload] = useState(false);
    const fileInput = document.createElement("input");
    const uploadFiles = (): Promise<File | null> => {
        return new Promise((resolve) => {
            fileInput.type = type;
            fileInput.accept = accept;
            fileInput.multiple = multiple;

            fileInput.onchange = (event) => {
                resolve((event.target as HTMLInputElement).files?.[0] || null);
            };

            fileInput.oncancel = () => resolve(null);
            fileInput.click();
        });
    };

    const handleUploadClick = async () => {
        const file = await uploadFiles();
        if (!file) {
            return;
        }

        const fileSrc = URL.createObjectURL(file);

        setFile(file);
        setFileSrc(fileSrc);
        setIsFileUpload(true);
    };
    const clear = () => {
        setFile(null);
        setFileSrc(null);
        setIsFileUpload(false);
    }
    return {
        file,
        fileSrc,
        clear,
        isFileUpload,
        setIsFileUpload,
        handleUploadClick
    }
}
import { useState } from "react";

interface IUseFileUploadProps {
    type: string,
    accept: string,
    multiple: boolean
}

interface IUseFileUploadReturn {
    file: File | null,
    setFile: (value: null) => void,
    fileSrc: string | null,
    setFileSrc: (value: null) => void,
    fileUpload: boolean,
    setFileUpload: (value: boolean) => void,
    handleUploadClick: () => Promise<void>
}

export const useFileUpload = ({
    type,
    accept,
    multiple
}: IUseFileUploadProps): IUseFileUploadReturn => {
    const [file, setFile] = useState<File | null>(null);
    const [fileSrc, setFileSrc] = useState<string | null>(null);
    const [fileUpload, setFileUpload] = useState(false);
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
        setFileUpload(true);
    };
    return {
        file,
        setFile,
        fileSrc,
        setFileSrc,
        fileUpload,
        setFileUpload,
        handleUploadClick
    }
}
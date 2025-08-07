import { useState } from "react";

interface useFileUploadProps {
    fileInput: HTMLInputElement,
    type: string,
    accept: string,
    multiple: boolean
}

interface useFileUploadReturn {
    file: File | null,
    fileSrc: string | null,
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void,
    handleUploadClick: () => Promise<void>
}

export const useFileUpload = ({
    fileInput,
    type,
    accept,
    multiple
}: useFileUploadProps): useFileUploadReturn => {
    const [file, setFile] = useState<File | null>(null);
    const [fileSrc, setFileSrc] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true);
    };
    return {
        file,
        fileSrc,
        isModalOpen,
        setIsModalOpen,
        handleUploadClick
    }
}
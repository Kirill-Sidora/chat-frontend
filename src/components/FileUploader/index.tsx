import FilePreviewModal from "@components/FilePreviewModal";
import { useState } from "react";
// import { FilePreviewModal } from "@components/FilePreviewModal"

const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const uploadFiles = (): Promise<File | null> => {
        return new Promise((resolve) => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = ".jpg, .jpeg, .png";
            fileInput.multiple = false;

            fileInput.onchange = (event) => {
                resolve((event.target as HTMLInputElement).files?.[0] || null);
            };

            fileInput.oncancel = () => resolve(null);
            fileInput.click();
        })
    }

    const handleUploadClick = async () => {
        const file = await uploadFiles();
        if(file) {
            setSelectedFile(file);
            setIsModalOpen(true);
        }
    };

    const handleSend = () => {
        if(!selectedFile) return;
        console.log("Отправка файла:", selectedFile.name);
        setIsModalOpen(false);
    }

    return (
        <>
            <button
                onClick={handleUploadClick}
                style={{ display: 'none'}}
                id="file-upload-button"
            />

            {isModalOpen && selectedFile && (
                <FilePreviewModal 
                    file={selectedFile}
                    onClose={() => setIsModalOpen(false)}
                    onSend={handleSend}
                />
            )}
        </>
    );
};

export default FileUploader;
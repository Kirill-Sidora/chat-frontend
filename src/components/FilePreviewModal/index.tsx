import FilePreviewModalContent from "@components/FilePreviewModalContent";
import "./style.css"

interface FilePreviewModalProps {
    file: File;
    onClose: () => void;
    onSend: () => void;
}

const FilePreviewModal = ( { file, onClose, onSend }: FilePreviewModalProps) => {
    return(
        <div className="modal-overlay">
            <FilePreviewModalContent file={file} onClose={onClose} onSend={onSend}/>
        </div>
    );
};

export default FilePreviewModal;
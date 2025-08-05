// import { useState } from "react"
import "./style.css"

interface FilePreviewModalProps {
    file: File;
    onClose: () => void;
    onSend: () => void;
}

const FilePreviewModal = ( { file, onClose, onSend }: FilePreviewModalProps) => {
    return(
        <div className="modal-overlay">
            {file.type.startsWith('image/') ? (
                <div className="modal-content primary-text">
                    <div>Send image</div>
                    <div className="preview-modal-image">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Превью"
                            className="file-preview"
                        />    
                    </div>
                    <div className="image-info">
                        <div>Name: {file.name}</div>
                        <div>Size: {(file.size)} KB</div>
                    </div>
                    <div className="preview-modal-buttons">
                        <button className="button-style primary-text" onClick={onClose}>Cancel</button>
                        <button className="button-style primary-text" onClick={onSend}>Send</button>
                    </div>
                </div>
            ) : (
                <div/>
            )}
        </div>
    );
};

export default FilePreviewModal;
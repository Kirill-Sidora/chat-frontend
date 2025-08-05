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
            <div className="modal-content">
                <h3>Отправить файл?</h3>
                <p>Имя: {file.name}</p>
                <p>Размер: {(file.size)} KB</p>

                {file.type.startsWith('image/') ? (
                    <img 
                        src={URL.createObjectURL(file)}
                        alt="Превью"
                        className="file-preview"
                    />
                ) : (
                    <div/>
                )}

                <div className="modal-cation">
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={onSend}>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
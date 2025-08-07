import ImagePreview from '@components/ImagePreview'
import './style.css'

interface IModalWindowContentProps {
    file: File,
    onClose: () => void,
    onSend: () => void
}

const ModalWindowContent = ({
    file,
    onClose,
    onSend
}: IModalWindowContentProps) => {
    return(
        <div className="modal-content primary-text">
            <ImagePreview file={file}/>
            <div className="preview-modal-buttons">
                <button className="button-style primary-text" onClick={onClose}>Cancel</button>
                <button className="button-style primary-text" onClick={onSend}>Send</button>
            </div>
        </div>
    )
}

export default ModalWindowContent;
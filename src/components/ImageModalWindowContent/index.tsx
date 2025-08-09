import ImagePreview from '@components/ImagePreview'
import './style.css'

interface IImageModalWindowContentProps {
    file: File,
    onClose: () => void,
    onSend: () => void
}

const ImageModalWindowContent = ({
    file,
    onClose,
    onSend
}: IImageModalWindowContentProps) => {
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

export default ImageModalWindowContent;
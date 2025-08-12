import ImagePreview from '@components/ImagePreview';
import CustomButton from '@components/CustomButton';
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
                <CustomButton type="button-style primary-text" onClick={onClose}>Cancel</CustomButton>
                <CustomButton type="button-style primary-text" onClick={onSend}>Send</CustomButton>
            </div>
        </div>
    )
}

export default ImageModalWindowContent;
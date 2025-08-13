import { type ReactElement } from 'react'
import './style.css'

interface IImagePreviewProps {
    file: File;
}

const ImagePreview = ({file}: IImagePreviewProps): ReactElement => {
    return(
        <div>
            <div className="title-text">Send image</div>
            <div className="preview-modal-image">
                <img src={URL.createObjectURL(file)} alt="Превью" />
            </div>
            <div className="image-info secondary-text">
                <div>Name: {file.name}</div>
                <div>Size: {file.size} KB</div>
            </div>
        </div>
    );
};

export default ImagePreview;

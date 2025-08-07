import './style.css'

interface IImagePreviewProps {
    file: File
}

const ImagePreview = ({file}: IImagePreviewProps) => {
    return(
        <div>
            <div>Send image</div>
            <div className="preview-modal-image">
                <img
                    src={URL.createObjectURL(file)}
                    alt="Превью"
                />
            </div>
            <div className="image-info">
                <div>Name: {file.name}</div>
                <div>Size: {(file.size)} KB</div>
            </div>
        </div>
    )
}

export default ImagePreview;
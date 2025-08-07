import "./style.css"

interface IModalWindowProps {
    children?: React.ReactNode
}

const ModalWindow = ( { children }: IModalWindowProps) => {
    return(
        <div className="modal-overlay">
            {children}
        </div>
    );
};

export default ModalWindow;
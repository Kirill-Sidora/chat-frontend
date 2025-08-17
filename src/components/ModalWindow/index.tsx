import { type ReactElement } from "react";
import "./style.css";

interface IModalWindowProps {
    children?: React.ReactNode;
}

const ModalWindow = ({ children }: IModalWindowProps): ReactElement => {
    return <div className="modal-overlay">{children}</div>;
};

export default ModalWindow;

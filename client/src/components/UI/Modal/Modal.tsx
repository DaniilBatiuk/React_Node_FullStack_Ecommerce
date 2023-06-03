import React from "react";
import "./Modal.scss";

export interface ModalProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active, setActive, children }: ModalProps) => {

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>{children}</div>
        </div>
    );
}

export default Modal;
import React from "react";
import "./Modal.scss";

export interface ModalProps {
    active: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active, children }: ModalProps) => {

    return (
        <div className={active ? "modal active" : "modal"}>
            <div className={active ? "modal__content active" : "modal__content"}>{children}</div>
        </div>
    );
}

export default Modal;
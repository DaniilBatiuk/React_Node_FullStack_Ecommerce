import React from "react";
import "./Modal.scss";

export interface ModalProps {
    active: boolean;
    children: React.ReactNode;
    maxDivWidth: string;
}

const Modal: React.FC<ModalProps> = ({ active, children, maxDivWidth }: ModalProps) => {

    return (
        <section className={active ? "modal active" : "modal"}>
            <div className={active ? "modal__content active" : "modal__content"} style={{ maxWidth: maxDivWidth }}>{children}</div>
        </section>
    );
}

export default Modal;
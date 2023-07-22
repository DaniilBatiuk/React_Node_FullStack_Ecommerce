import React from "react";
import Modal from "./UI/Modal/Modal";
import MyButton from "./UI/Modal/Button/MyButton";

export interface MessageProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
    message?: string;
}

const Message: React.FC<MessageProps> = ({ active, setActive, message }: MessageProps) => {

    return (
        <Modal active={active} maxDivWidth="400px">
            <div className="modal__header">
                <div className="modal__title title">Message</div>
                <svg onClick={() => setActive(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
            </div>
            <div className="modal__message">{message}</div>
            <MyButton type="button" value="Ok" onClick={() => setActive(false)} />
        </Modal>
    );
}

export default Message;
import React, { InputHTMLAttributes } from "react";
import "./MyButton.scss";

interface MyButtonProps extends InputHTMLAttributes<HTMLInputElement> { }

const MyButton: React.FC<MyButtonProps> = (props: MyButtonProps) => {
    return <input className="my-button" {...props} />;
};

export default MyButton;
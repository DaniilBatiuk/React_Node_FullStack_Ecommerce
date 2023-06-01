import React, { ButtonHTMLAttributes } from "react";
import "./MyButton.scss";

interface MyInputProps extends ButtonHTMLAttributes<HTMLInputElement> { }

const MyButton: React.FC<MyInputProps> = (props: MyInputProps) => {
    return <input className="my-button" {...props} />;
};

export default MyButton;
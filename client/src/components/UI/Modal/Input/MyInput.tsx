import React, { InputHTMLAttributes } from "react";
import "./MyInput.scss";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const MyInput: React.FC<MyInputProps> = (props: MyInputProps) => {
    return <input className="my-input" {...props} />;
};

export default MyInput;
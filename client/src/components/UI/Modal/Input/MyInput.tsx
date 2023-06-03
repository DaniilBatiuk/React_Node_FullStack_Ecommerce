import React, { InputHTMLAttributes, forwardRef } from "react";
import "./MyInput.scss";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const MyInput: React.ForwardRefRenderFunction<HTMLInputElement, MyInputProps> = ({ ...props }, ref) => {
    return <input className="my-input" ref={ref} {...props} />;
};

export default forwardRef(MyInput);
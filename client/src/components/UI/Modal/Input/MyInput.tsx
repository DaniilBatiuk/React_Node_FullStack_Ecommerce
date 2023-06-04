import React from "react";
import "./MyInput.scss";
import { Path, UseFormRegister } from "react-hook-form";

export interface IFormValues {
    email: string;
    password: string;
}

export interface IFormValues2 {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

type InputProps = {
    label: Path<IFormValues> | Path<IFormValues2>;
    register: UseFormRegister<IFormValues> | UseFormRegister<IFormValues2>;
    required: boolean;
    type: string,
    placeholder: string,
};

type RegisterFunction = UseFormRegister<IFormValues> & UseFormRegister<IFormValues2>;

const MyInput: React.FC<InputProps> = ({ label, register, required, type, placeholder }: InputProps) => {
    const registerFn = register as RegisterFunction;

    return <input type={type} placeholder={placeholder} className="my-input" {...registerFn(label, { required })} />;
};

export default MyInput;
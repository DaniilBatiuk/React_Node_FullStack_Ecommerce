import React from "react";
import "./MyInput.scss";
import { Path, UseFormRegister } from "react-hook-form";
import { IFormValues, IFormValues2, Product } from "../../../../types/types";

type InputProps = {
    label: Path<any>;
    register: UseFormRegister<IFormValues> | UseFormRegister<IFormValues2> | UseFormRegister<Product>;
    required: boolean;
    type: string,
    placeholder: string,
};

type RegisterFunction = UseFormRegister<any>;

const MyInput: React.FC<InputProps> = ({ label, register, required, type, placeholder }: InputProps) => {
    const registerFn = register as RegisterFunction;

    return <input type={type} placeholder={placeholder} className="my-input" {...registerFn(label, { required })} />;
};

export default MyInput;
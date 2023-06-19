import React from "react";
import "./MyInput.scss";
import { Path, UseFormRegister } from "react-hook-form";

type InputProps = {
    label: Path<any>;
    register: UseFormRegister<any>;
    required: boolean;
    type: string,
    placeholder: string,
};

const MyInput: React.FC<InputProps> = ({ label, register, required, type, placeholder }: InputProps) => {

    return <input type={type} placeholder={placeholder} className="my-input" {...register(label, { required })} />;
};

export default MyInput;
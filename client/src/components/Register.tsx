import React, { useState } from "react";
import "../styles/Login.scss";
import MyInput from "./UI/Modal/Input/MyInput";
import MyButton from "./UI/Modal/Button/MyButton";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./UI/Modal/Modal";
import { fetchRegister } from "../redux/slices/auth";
import { useAppDispatch } from "../redux/store";
import { IFormValues2 } from "../types/types";

export interface RegisterProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}


const Register: React.FC<RegisterProps> = ({ active, setActive }: RegisterProps) => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues2>();
    const onSubmit: SubmitHandler<IFormValues2> = (data: IFormValues2) => {
        if (!(data.password === data.passwordConfirm)) {
            setError(true);
            setErrorMessage("Passwords must be the same");
            return;
        }
        dispatch(fetchRegister(data))
            .unwrap()
            .then((response) => {
                setError(false);
            })
            .catch((error) => {
                setError(true);
                setErrorMessage(error[0]?.msg);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Modal active={active} maxDivWidth="400px">
                <div className="modal__header">
                    <div className="modal__title title">Sign Up</div>
                    <svg onClick={() => setActive(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
                </div>
                {((errors.email || errors.password || errors.fullName || errors.passwordConfirm) && !error) && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            All fields must be filled
                        </div>
                    </div>
                )}
                {(error) && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            {errorMessage}
                        </div>
                    </div>
                )}
                <div className="modal__label">Full name</div>
                <MyInput type="text" placeholder="Enter full name" label="fullName" register={register} required />
                <div className="modal__label">Email adress</div>
                <MyInput type="text" placeholder="Enter email" label="email" register={register} required />
                <div className="modal__label">Password</div>
                <MyInput type="password" placeholder="Enter password" label="password" register={register} required />
                <div className="modal__label">Confirm Password</div>
                <MyInput type="password" placeholder="Enter password" label="passwordConfirm" register={register} required />
                <MyButton type="submit" value="Sing Up" />
            </Modal>
        </form>
    );
};

export default Register;

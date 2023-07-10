import React from "react";
import "../styles/Login.scss";
import MyInput from "./UI/Modal/Input/MyInput";
import MyButton from "./UI/Modal/Button/MyButton";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./UI/Modal/Modal";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchAuth } from "../redux/slices/auth";
import { IFormValues } from "../types/types";
import { useSelector } from "react-redux";

export interface LoginProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}


const Login: React.FC<LoginProps> = ({ active, setActive }: LoginProps) => {
    const dispatch = useAppDispatch();
    
    const { fetchAuthErrors } = useSelector((state: RootState) => state.auth.errors);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>();


    const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues) => {
        dispatch(fetchAuth(data));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Modal active={active} maxDivWidth="400px">
                <div className="modal__header">
                    <h2 className="modal__title title">Sign In</h2>
                    <svg onClick={() => setActive(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
                </div>
                {(errors.email || errors.password) && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            All fields must be filled
                        </div>
                    </div>
                )}
                {(fetchAuthErrors.length !== 0) && (
                    fetchAuthErrors.map((error) => (
                        <div className="alert alert-danger" role="alert" key={error}>
                            <div>
                                {error}
                            </div>
                        </div>
                    ))
                )}
                <label className="modal__label">Email address</label>
                <MyInput type="text" placeholder="Enter email" label="email" register={register} required />
                <label className="modal__label">Password</label>
                <MyInput type="password" placeholder="Enter password" label="password" register={register} required />
                <MyButton type="submit" value="Sign In" />
            </Modal>
        </form>
    );
};

export default Login;


import React from "react";
import "../styles/Login.scss";
import MyInput, { IFormValues } from "./UI/Modal/Input/MyInput";
import MyButton from "./UI/Modal/Button/MyButton";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./UI/Modal/Modal";
import { useAppDispatch } from "../redux/store";
import { fetchAuth } from "../redux/slices/auth";

export interface LoginProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}


const Login: React.FC<LoginProps> = ({ active, setActive }: LoginProps) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>();
    const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues) => dispatch(fetchAuth(data));


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal active={active} setActive={setActive}>
                <div className="modal__title title">Sign In</div>
                {(errors.email || errors.password) && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            Incorrect email or password.
                        </div>
                    </div>
                )}
                <div className="modal__label">Email address</div>
                <MyInput type="text" placeholder="Enter email" label="email" register={register} required />
                <div className="modal__label">Password</div>
                <MyInput type="password" placeholder="Enter password" label="password" register={register} required />
                <MyButton type="submit" value="Sign In" />
            </Modal>
        </form>
    );
};

export default Login;


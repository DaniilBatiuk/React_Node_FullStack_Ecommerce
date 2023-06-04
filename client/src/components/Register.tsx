import React from "react";
import "../styles/Login.scss";
import MyInput, { IFormValues2 } from "./UI/Modal/Input/MyInput";
import MyButton from "./UI/Modal/Button/MyButton";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./UI/Modal/Modal";

export interface RegisterProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}


const Register: React.FC<RegisterProps> = ({ active, setActive }: RegisterProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues2>();
    const onSubmit: SubmitHandler<IFormValues2> = data => console.log(data);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal active={active} setActive={setActive}>
                <div className="modal__title title">Sign Up</div>
                {(errors.email || errors.password || errors.fullName || errors.passwordConfirm) && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            Incorrect email or password.
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

import React, { forwardRef } from "react";
import "../styles/Login.scss";
import MyInput from "./UI/Modal/Input/MyInput";
import MyButton from "./UI/Modal/Button/MyButton";
import { useForm } from "react-hook-form";
import Modal from "./UI/Modal/Modal";

export interface LoginProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}

const Login: React.ForwardRefRenderFunction<HTMLFormElement, LoginProps> = ({ active, setActive }: LoginProps, ref) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: 'onSubmit'
    });

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
            <Modal active={active} setActive={setActive}>
                <div className="modal__title title">Sign In</div>
                {errors.email && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            {errors.email?.message}
                        </div>
                    </div>
                )}
                {errors.password && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            {errors.password?.message}
                        </div>
                    </div>
                )}
                <div className={errors.email ? "modal__label__error" : "modal__label"}>Email address</div>
                <MyInput type="text" placeholder="Enter email" {...register("email", { required: "Field email cannot be empty" })} />
                <div className={errors.password ? "modal__label__error" : "modal__label"}>Password</div>
                <MyInput type="password" placeholder="Enter password" {...register("password", { required: "Field password cannot be empty" })} />
                <MyButton type="submit" value="Sign In" />
            </Modal>
        </form>
    );
};

export default forwardRef(Login);


import React, { useState } from "react";
import logo from "../assets/photos/logo.jpg";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import { ScrollUp } from "../utils/functions";
import Modal from "./UI/Modal/Modal";
import MyInput from "./UI/Modal/Input/MyInput";
import MyButton from "./UI/Modal/Button/MyButton";
import Login from "./Login";
import "../styles/Login.scss";

const HeaderMenu: React.FC = () => {

    const ShowMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        const targetItem = e.target as Element;
        if (targetItem.closest('.icon-menu')) {
            document.documentElement.classList.toggle('menu-open');
        }
    }

    const [modalSignInActive, setModalSignInActive] = useState(false);
    const [modalSignUpActive, setModalSignUpActive] = useState(false);

    return (
        <>
            <header className="header">
                <div className="header__container">
                    <div className="header__content">
                        <Link to="/" className="header__logo" onClick={ScrollUp}>
                            <img src={logo} alt="" />
                        </Link>
                        <nav className="header__menu menu">
                            <div className="menu__body">
                                <ul className="menu__list">
                                    <li>
                                        <Link to="/Categories" className="menu__link" onClick={ScrollUp}>Categories</Link>
                                    </li>
                                    <li>
                                        <div className="menu__link" onClick={() => setModalSignInActive(true)}>Sign In</div>
                                    </li>
                                    <li>
                                        <div className="menu__link menu__link-border" onClick={() => setModalSignUpActive(true)}>Sign Up</div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <a href="" className="header__cart cart-header">
                            <span className="cart-header__text">Cart</span>
                            <span className="cart-header__quantity">0</span>
                        </a>
                        <button className="icon-menu" onClick={ShowMenu} type="button">
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
            <Login active={modalSignInActive} setActive={setModalSignInActive} />
            <Modal active={modalSignUpActive} setActive={setModalSignUpActive}>
                <div className="modal__title title">Sign Up</div>
                <div className="modal__label">Full name</div>
                <MyInput type="text" placeholder="Enter full name" />
                <div className="modal__label">Email adress</div>
                <MyInput type="text" placeholder="Enter email" />
                <div className="modal__label">Password</div>
                <MyInput type="text" placeholder="Enter password" />
                <div className="modal__label">Confirm Password</div>
                <MyInput type="text" placeholder="Enter password" />
                <MyButton type="button" value="Sing Up" />
            </Modal>
        </>
    );

}
export default HeaderMenu;
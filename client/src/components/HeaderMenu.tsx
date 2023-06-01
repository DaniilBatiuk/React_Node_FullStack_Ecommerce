import React, { useState } from "react";
import logo from "../assets/photos/logo.jpg";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import { ScrollUp } from "../utils/functions";
import Modal from "./UI/Modal/Modal";
import MyInput from "./UI/Modal/Input/MyInput";
import MyButton from "./UI/Modal/Button/MyButton";

const HeaderMenu: React.FC = () => {

    const ShowMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        const targetItem = e.target as Element;
        if (targetItem.closest('.icon-menu')) {
            document.documentElement.classList.toggle('menu-open');
        }
    }

    const [modalActive, setModalActive] = useState(false);


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
                                        <div className="menu__link" onClick={() => setModalActive(true)}>Log In</div>
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
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="modal__title title">Sign In</div>
                <div className="modal__label">Email adress</div>
                <MyInput type="text" placeholder="Enter email" />
                <div className="modal__label">Password</div>
                <MyInput type="text" placeholder="Enter password" />
                <MyButton type="submit" value="Sing In" />
            </Modal>
        </>
    );
}

export default HeaderMenu;
import React, { useEffect, useState } from "react";
import logo from "../assets/photos/logo.jpg";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import { ScrollUp } from "../utils/functions";
import Login from "./Login";
import "../styles/Login.scss";
import Register from "./Register";
import { useSelector } from "react-redux";
import { signout, selectIsAuth } from "../redux/slices/auth";
import { useAppDispatch } from "../redux/store";

const HeaderMenu: React.FC = () => {
    const dispatch = useAppDispatch();

    const ShowMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        const targetItem = e.target as Element;
        if (targetItem.closest('.icon-menu')) {
            document.documentElement.classList.toggle('menu-open');
        }
    }

    const [modalSignInActive, setModalSignInActive] = useState(false);
    const [modalSignUpActive, setModalSignUpActive] = useState(false);
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        if (isAuth) setModalSignInActive(false);
    }, [isAuth]);

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
                                    {!isAuth &&
                                        <>
                                            <li>
                                                <div className="menu__link" onClick={() => setModalSignInActive(true)}>Sign In</div>
                                            </li>
                                            <li>
                                                <div className="menu__link menu__link-border" onClick={() => setModalSignUpActive(true)}>Sign Up</div>
                                            </li>
                                        </>
                                    }
                                    {isAuth &&
                                        <li>
                                            <button className="menu__link menu__link-border" onClick={() => dispatch(signout())}>Sign Out</button>
                                        </li>
                                    }
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
            <Register active={modalSignUpActive} setActive={setModalSignUpActive} />
        </>
    );

}
export default HeaderMenu;
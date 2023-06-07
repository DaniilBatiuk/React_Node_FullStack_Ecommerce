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
import Basket from "./Basket";

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
    const [basketActive, setBasketActive] = useState(false);

    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        if (isAuth) setModalSignInActive(false); setModalSignUpActive(false);
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
                                    {(!isAuth) ?
                                        <>
                                            <li>
                                                <div className="menu__link" onClick={() => setModalSignInActive(true)}>Sign In</div>
                                            </li>
                                            <li>
                                                <div className="menu__link menu__link-border" onClick={() => setModalSignUpActive(true)}>Sign Up</div>
                                            </li>
                                        </>
                                        :
                                        <li>
                                            <button className="menu__link menu__link-border" onClick={() => { dispatch(signout()); }}>Sign Out</button>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </nav>
                        <div className="header__cart cart-header">
                            <button className="cart-header__text" onClick={() => setBasketActive(true)}>Basket</button>
                            <span className="cart-header__quantity">0</span>
                        </div>
                        <button className="icon-menu" onClick={ShowMenu} type="button">
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
            <Login active={modalSignInActive} setActive={setModalSignInActive} />
            <Register active={modalSignUpActive} setActive={setModalSignUpActive} />
            <Basket active={basketActive} setActive={setBasketActive} />
        </>
    );

}
export default HeaderMenu;
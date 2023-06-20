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
import { RootState, useAppDispatch } from "../redux/store";
import Basket from "./Basket";
import CreateProduct from "./CreateProduct";

const HeaderMenu: React.FC = () => {
    const dispatch = useAppDispatch();

    const ShowMenu = () => {
        document.documentElement.classList.toggle('menu-open');
        SetIsMenuActive((prev) => !prev);
    }

    const [modalSignInActive, setModalSignInActive] = useState(false);
    const [modalSignUpActive, setModalSignUpActive] = useState(false);
    const [modalCreateProductActive, setModalCreateProductActive] = useState(false);
    const [basketActive, setBasketActive] = useState(false);
    const [isMenuActive, SetIsMenuActive] = useState(false);
    const { basket } = useSelector((state: RootState) => state.auth);
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        if (basketActive === true || modalCreateProductActive === true || modalSignUpActive === true || modalSignInActive === true) {
            document.body.classList.add('no-scroll');
        }
        else {
            document.body.classList.remove('no-scroll');
        }
    }, [basketActive, modalCreateProductActive, modalSignUpActive, modalSignInActive]);

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
                                        <Link to="/Categories" className="menu__link" onClick={() => { ScrollUp(); if (isMenuActive) { ShowMenu(); } }}>Categories</Link>
                                    </li>
                                    <li>
                                        <button className="menu__link" onClick={() => { setModalCreateProductActive(true); if (isMenuActive) { ShowMenu(); } }}>Create Product</button>
                                    </li>
                                    {(!isAuth) ?
                                        <>
                                            <li>
                                                <button className="menu__link" onClick={() => { setModalSignInActive(true); if (isMenuActive) { ShowMenu(); } }}>Sign In</button>
                                            </li>
                                            <li>
                                                <button className="menu__link menu__link-border" onClick={(e) => { setModalSignUpActive(true); if (isMenuActive) { ShowMenu(); } }}>Sign Up</button>
                                            </li>
                                        </>
                                        :
                                        <li>
                                            <button className="menu__link menu__link-border" onClick={() => { dispatch(signout()); if (isMenuActive) { ShowMenu(); } }}>Sign Out</button>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </nav>
                        <div className="header__cart cart-header">
                            <button className="cart-header__text" onClick={() => setBasketActive(true)}>Basket</button>
                            <span className="cart-header__quantity" style={{ backgroundColor: basket.length === 0 ? "rgba(97, 97, 104, 0.3)" : "rgba(201, 3, 3, 0.89)", color: basket.length === 0 ? "black" : "white" }}>{basket.length}</span>
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
            <CreateProduct active={modalCreateProductActive} setActive={setModalCreateProductActive} />
        </>
    );

}
export default HeaderMenu;
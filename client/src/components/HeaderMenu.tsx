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

    const [modalSignInActive, setModalSignInActive] = useState(false);
    const [modalSignUpActive, setModalSignUpActive] = useState(false);
    const [modalCreateProductActive, setModalCreateProductActive] = useState(false);
    const [basketActive, setBasketActive] = useState(false);
    const [isMenuActive, SetIsMenuActive] = useState(false);

    const { basket } = useSelector((state: RootState) => state.auth);
    const isAuth = useSelector(selectIsAuth);

    const ShowMenu = () => {
        document.documentElement.classList.toggle('menu-open');
        SetIsMenuActive((prev) => !prev);
    }

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
                                        <Link to="/Categories/All" className="menu__link" onClick={() => { ScrollUp(); if (isMenuActive) { ShowMenu(); } }}>Categories</Link>
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
                                        <>
                                            <li>
                                                <button className="menu__link" onClick={() => { setModalCreateProductActive(true); if (isMenuActive) { ShowMenu(); } }}>Create Product</button>
                                            </li>
                                            <li>
                                                <button className="menu__link menu__link-border" onClick={() => { dispatch(signout()); if (isMenuActive) { ShowMenu(); } }}>Sign Out</button>
                                            </li>
                                        </>

                                    }
                                </ul>
                            </div>
                        </nav>
                        <div className="header__cart cart-header">
                            <svg onClick={() => { if (!isAuth) { setModalSignInActive(true); } else { setBasketActive(true); } if (isMenuActive) { ShowMenu(); } }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-basket" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M7 10l5 -6l5 6"></path>
                                <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z"></path>
                                <path d="M12 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                            </svg>
                            <span className="cart-header__quantity" style={{ backgroundColor: basket.length === 0 ? "rgba(97, 97, 104, 0.3)" : "rgba(201, 3, 3, 0.89)", color: basket.length === 0 ? "black" : "white" }}>{basket.length}</span>
                            <Link to="/Profile" onClick={(e) => {
                                if (!isAuth) {
                                    setModalSignInActive(true);
                                    e.preventDefault();
                                } else {
                                    ScrollUp();
                                }
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="42" viewBox="0 -960 960 960" width="42"><path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" /></svg>
                            </Link>
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
import React from "react";
import logo from "../photos/logo.jpg";
import { Link } from "react-router-dom";

const HeaderMenu: React.FC = () => {

    const ShowMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        const targetItem = e.target as Element;
        if (targetItem.closest('.icon-menu')) {
            document.documentElement.classList.toggle('menu-open');
        }
    }
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__content">
                    <Link to="/" className="header__logo">
                        <img src={logo} alt="" />
                    </Link>
                    <nav className="header__menu menu">
                        <div className="menu__body">
                            <ul className="menu__list">
                                <li>
                                    <Link to="/Categories" className="menu__link">Categories</Link>
                                </li>
                                <li>
                                    <Link to="/" className="menu__link">Product page</Link>
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
    );
}

export default HeaderMenu;
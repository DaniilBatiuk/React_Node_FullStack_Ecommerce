import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";

const CategoryNav: React.FC = () => {
    return (
        <section className="category-nav">
            <div className="category-nav__container">
                <div className="category-nav__header">
                    <Link to="/" className="category-nav__link">&#60;Home</Link>
                    <Title titleText="All" classNames="category-nav__title" ></Title>
                </div>
                <div className="category-nav__list navigation-list">
                    <button className="navigation-list__item">All</button>
                    <button className="navigation-list__item">Furnitures</button>
                    <button className="navigation-list__item">Electronics</button>
                    <button className="navigation-list__item">Lamps</button>
                    <button className="navigation-list__item">Kitchen</button>
                </div>
            </div>
        </section>
    );
}

export default CategoryNav;
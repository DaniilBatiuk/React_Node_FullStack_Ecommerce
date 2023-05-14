import React, { useState } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import "../styles/CategoryNav.scss";

const CategoryNav: React.FC = () => {

    const [title, setTitle] = useState("All");


    return (
        <section className="category-nav">
            <div className="category-nav__container">
                <div className="category-nav__header">
                    <Link to="/" className="category-nav__link">&#60;Home</Link>
                    <Title titleText={title} classNames="category-nav__title" ></Title>
                </div>
                <div className="category-nav__list navigation-list">
                    <button className="navigation-list__item" onClick={() => setTitle("All")}>All</button>
                    <button className="navigation-list__item" onClick={() => setTitle("Furnitures")}>Furnitures</button>
                    <button className="navigation-list__item" onClick={() => setTitle("Electronics")}>Electronics</button>
                    <button className="navigation-list__item" onClick={() => setTitle("Lamps")}>Lamps</button>
                    <button className="navigation-list__item" onClick={() => setTitle("Kitchen")}>Kitchen</button>
                </div>
            </div>
        </section>
    );
}

export default CategoryNav;
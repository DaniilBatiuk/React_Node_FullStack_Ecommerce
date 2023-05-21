import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CategoryNav.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { fetchTypes } from "../redux/slices/types";

const CategoryNav: React.FC = () => {
    const dispatch = useDispatch();
    const { types } = useSelector((state: RootState) => state.type)
    const [title, setTitle] = useState("All");

    useEffect(() => {
        dispatch(fetchTypes() as any);
    }, []);

    return (
        <section className="category-nav">
            <div className="category-nav__container">
                <div className="category-nav__header">
                    <Link to="/" className="category-nav__link">&#60;Home</Link>
                    <div className="category-nav__title title" >{title}</div>
                </div>
                <div className="category-nav__list navigation-list">
                    <button className="navigation-list__item" onClick={() => setTitle("All")}>All</button>
                    {(types.length !== 0) ? (
                        types.map((type) => (
                            <button className="navigation-list__item" key={type._id} onClick={() => setTitle(type.name)}> {type.name} </button>))
                    ) :
                        (
                            <>
                                <button className="navigation-list__item" onClick={() => setTitle("Furnitures")}>Furnitures</button>
                                <button className="navigation-list__item" onClick={() => setTitle("Electronics")}>Electronics</button>
                                <button className="navigation-list__item" onClick={() => setTitle("Lamps")}>Lamps</button>
                                <button className="navigation-list__item" onClick={() => setTitle("Kitchen")}>Kitchen</button>
                            </>
                        )}
                </div>
            </div>
        </section>
    );
}

export default CategoryNav;
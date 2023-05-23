import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CategoryNav.scss";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from "../redux/store";
import { Type, fetchTypes } from "../redux/slices/types";
import { fetchProducts, fetchProductsByType } from "../redux/slices/products";

const CategoryNav: React.FC = () => {
    const dispatch = useAppDispatch();
    const { types } = useSelector((state: RootState) => state.type);
    const [title, setTitle] = useState("All");

    const SelectByType = (type: Type) => {
        setTitle(type.name);
        dispatch(fetchProductsByType(type._id));
    }

    useEffect(() => {
        dispatch(fetchTypes());
    }, [dispatch]);

    return (
        <section className="category-nav">
            <div className="category-nav__container">
                <div className="category-nav__header">
                    <Link to="/" className="category-nav__link">&#60;Home</Link>
                    <div className="category-nav__title title" >{title}</div>
                </div>
                <div className="category-nav__list navigation-list">
                    <button className="navigation-list__item" onClick={() => { setTitle("All"); dispatch(fetchProducts());}}>All</button>
                    {(types.length !== 0) && (
                        types.map((type) => (
                            <button className="navigation-list__item" key={type._id} onClick={() => SelectByType(type)}> {type.name} </button>))
                    )}
                </div>
            </div>
        </section>
    );
}

export default CategoryNav;
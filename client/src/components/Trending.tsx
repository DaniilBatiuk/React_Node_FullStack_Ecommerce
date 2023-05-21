import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/types";
import "../styles/Trending.scss";
import axios from "../axios";


const Trending: React.FC = () => {

    useEffect(() => {
        const scrollConteiner = document.getElementById("scrollConteiner") as HTMLDivElement;
        const scrollLeftButton = document.getElementById("scrollLeftButton") as HTMLButtonElement;
        const scrollRightButton = document.getElementById("scrollRightButton") as HTMLButtonElement;
        if (scrollConteiner) {
            scrollConteiner.addEventListener("wheel", (e) => {
                e.preventDefault();
                scrollConteiner.scrollLeft += e.deltaY;
            });
            scrollLeftButton.addEventListener("click", () => {
                scrollConteiner.scrollLeft -= scrollConteiner.offsetWidth;
            });
            scrollRightButton.addEventListener("click", () => {
                scrollConteiner.scrollLeft += scrollConteiner.offsetWidth;
            });
        }
    }, []);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('/product')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, []);
    return (
        <section className="trending">
            <div className="trending__container">
                <div className="trending__title-buttons">
                    <div className="trending__title title">Trending Now</div>
                    <div className="trending__buttons">
                        <button className="trending__button" id="scrollLeftButton">&#129128;</button>
                        <button className="trending__button" id="scrollRightButton">&#129130;</button>
                    </div>
                </div>
                <div className="trending__items" id="scrollConteiner">
                    {products.map((elem) =>
                        <ProductCard key={elem._id} product={elem} />
                    )}
                </div>
            </div>
        </section>
    );
}

export default Trending;

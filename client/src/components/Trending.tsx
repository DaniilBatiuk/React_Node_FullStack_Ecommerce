import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import "../styles/Trending.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


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
    const { products } = useSelector((state: RootState) => state.product);

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
                    {(products.length !== 0) && (
                        products.map((elem) => (
                            <ProductCard key={elem._id} product={elem} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default Trending;

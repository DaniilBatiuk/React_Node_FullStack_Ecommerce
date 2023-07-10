import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import "../styles/Trending.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const Trending: React.FC = () => {

    const { products } = useSelector((state: RootState) => state.product);
    
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

    return (
        <section className="trending">
            <div className="trending__container">
                <div className="trending__title-buttons">
                    <h2 className="trending__title title">Trending Now</h2>
                    <div className="trending__buttons">
                        <button className="trending__button" id="scrollLeftButton">
                            <svg className="strelka-left-4" viewBox="0 0 100 85">
                                <polygon points="58.263,0.056 100,41.85 58.263,83.641 30.662,83.641 62.438,51.866 0,51.866 0,31.611 62.213,31.611 30.605,0 58.263,0.056" ></polygon>
                            </svg>
                        </button>
                        <button className="trending__button" id="scrollRightButton">
                            <svg className="strelka-right-4" viewBox="0 0 100 85">
                                <polygon points="58.263,0.056 100,41.85 58.263,83.641 30.662,83.641 62.438,51.866 0,51.866 0,31.611 62.213,31.611 30.605,0 58.263,0.056" ></polygon>
                            </svg>
                        </button>
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

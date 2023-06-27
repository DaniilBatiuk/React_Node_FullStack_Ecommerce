import React from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const ProductsProud: React.FC = () => {
    
    const { products } = useSelector((state: RootState) => state.product);

    return (
        <section className="products-proud">
            <div className="products-proud__container">
                <div className="title products-proud__title">Products we are proud of</div>
                <div className="products-proud__items">
                    {(products.length !== 0) && (
                        [...products].sort((a, b) => b.rating - a.rating).slice(0, 8).map((elem) => (
                            <ProductCard key={elem._id} product={elem} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProductsProud;
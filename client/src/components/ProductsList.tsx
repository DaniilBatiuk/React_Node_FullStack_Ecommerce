import React from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";




const ProductsList: React.FC = () => {
    const { products } = useSelector((state: RootState) => state.product);

    return (
        <section className="products-proud">
            <div className="products-proud__container">
                <div className="products-proud__items">
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

export default ProductsList;
import React from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";




const ProductsList: React.FC = () => {
    
    const { products } = useSelector((state: RootState) => state.product);

    if (products.length === 0) {
        return (
            <div className="spinner-center">
                <div className="spinner-body">
                    <div className="spinner-border" style={{ width: "3rem", height: "3rem", margin: "0 auto" }} role="status"></div>
                    <p className="spinner-text">Loading...</p>
                </div>
            </div>
        )
    }
    
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
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/products";




const ProductsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
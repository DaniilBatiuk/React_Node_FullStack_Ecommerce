import React from "react";
import ProductCard from "./ProductCard";
import {ProductAndTitleText } from "../types/types";
import Title from "./Title";

interface ProductsListProps {
    productAndTitleText: ProductAndTitleText;
}
const ProductsList: React.FC<ProductsListProps> = ({ productAndTitleText }: ProductsListProps) => {
    return (

        <section className="products-proud">
            <div className="products-proud__container">
                {productAndTitleText.titleText.titleText !== "" && productAndTitleText.titleText.classNames !== "" && (
                    <Title
                        titleText={productAndTitleText.titleText.titleText}
                        classNames={productAndTitleText.titleText.classNames}
                    />
                )}
                <div className="products-proud__items">
                    {productAndTitleText.product.map((elem) =>
                        <ProductCard key={elem.title} product={elem} />
                    )}

                </div>
            </div>
        </section>
    );
}

export default ProductsList;
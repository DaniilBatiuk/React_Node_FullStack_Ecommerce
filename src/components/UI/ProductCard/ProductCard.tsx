import React from "react";
import { Product } from "../../../types/types";

interface ProductProps {
    product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }: ProductProps) => {
    return (
        <div className="products-card__item">
            <div className="products-card__image">
                <img src={product?.photo} alt="" />
            </div>
            <div className="products-card__body">
                <div className="products-card__name">{product?.title}</div>
                <div className="products-card__price">{product?.price}$</div>
            </div>
        </div>
    );
}

export default ProductCard;
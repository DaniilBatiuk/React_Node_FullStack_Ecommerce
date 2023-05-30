import React from "react";
import { Product } from "../types/types";
import "../styles/ProductCard.scss";
import { Link } from "react-router-dom";
import { ScrollUp } from "../utils/functions";
interface ProductProps {
    product: Product;
}
const ProductCard: React.FC<ProductProps> = ({ product }: ProductProps) => {

    return (
        <Link to={`/Product/${product._id}`} className="products-card__item" onClick={ScrollUp}>
            <div className="products-card__image">
                <img src={`http://localhost:4000${product?.img[0]}`} alt="" />
            </div>
            <div className="products-card__body">
                <div className="products-card__name">{product?.title}</div>
                <div className="products-card__price">{product?.price}$</div>
            </div>
        </Link>
    );
}

export default ProductCard;
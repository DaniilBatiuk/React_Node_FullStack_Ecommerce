import React from "react";
import { Product } from "../types/types";
import "../styles/ProductCard.scss";
import { Link } from "react-router-dom";
import { ScrollUp } from "../utils/functions";
import axios from "../axios";
import { fetchProducts } from "../redux/slices/products";
import { useAppDispatch } from "../redux/store";

interface ProductProps {
    product: Product;
    myProfileProduct?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({ product, myProfileProduct }: ProductProps) => {

    const dispatch = useAppDispatch();

    const DeleteProduct = () => {
        axios
            .delete(`/product/${product._id}`)
            .then((res) => {
                dispatch(fetchProducts());
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
        e.preventDefault();
        DeleteProduct();
    };

    return (
        <Link to={`/Product/${product._id}`} className="products-card__item" onClick={ScrollUp}>
            <div className="products-card__image">
                <img src={`http://localhost:4000${product?.img[0]}`} alt="" />
            </div>
            <div className="products-card__body">
                <div className="products-card__name">{product?.title}</div>
                <div className="products-card__price">{product?.price}$</div>
            </div>
            {myProfileProduct &&
                <svg onClick={handleSVGClick} xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="products-card__svg-trash bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
            }
        </Link>
    );
}

export default ProductCard;
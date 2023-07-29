import React, { useEffect, useState } from "react";
import { IProduct } from "../types/types";
import "../styles/ProductCard.scss";
import { Link } from "react-router-dom";
import { ScrollUp } from "../utils/functions";
import axios from "../axios";
import { fetchProducts } from "../redux/slices/products";
import { useAppDispatch } from "../redux/store";
import UpdateProduct from "./UpdateProduct";

interface IProductProps {
    product: IProduct;
    myProfileProduct?: boolean;
}

const ProductCard: React.FC<IProductProps> = ({ product, myProfileProduct }: IProductProps) => {

    const dispatch = useAppDispatch();

    const [modalUpdateProductActive, setModalUpdateProductActive] = useState<boolean>(false);

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

    useEffect(() => {
        if (modalUpdateProductActive === true) {
            document.body.classList.add('no-scroll');
        }
        else {
            document.body.classList.remove('no-scroll');
        }
    }, [modalUpdateProductActive]);

    return (
        <Link to={`/Product/${product._id}`} className="products-card__item" onClick={ScrollUp}>
            <div className="products-card__image">
                <img src={`https://ecommerce-qttp.onrender.com${product?.img[0]}`} alt="" className="img-fluid" />
            </div>
            <div className="products-card__body">
                <div className="products-card__name">{product?.title}</div>
                <div className="products-card__price">{product?.price}$</div>
            </div>
            {myProfileProduct &&
                <>
                    <svg onClick={(e) => { e.preventDefault(); setModalUpdateProductActive(true); }} xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="products-card__svg-update bi bi-arrow-repeat" viewBox="0 0 16 16">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                        <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                    </svg>
                    <svg onClick={handleSVGClick} xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="products-card__svg-trash bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                    <UpdateProduct active={modalUpdateProductActive} setActive={setModalUpdateProductActive} product={product} />
                </>
            }
        </Link>
    );
}

export default ProductCard;
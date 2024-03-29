import React from "react";
import "../styles/BasketElem.scss";
import { IProduct } from "../types/types";
import { fetchDeleteFromBasket } from "../redux/slices/auth";
import { useAppDispatch } from "../redux/store";


export interface IBasketElemProps {
    item: {
        product: IProduct,
        quantity: number,
    };
}

const BasketElem: React.FC<IBasketElemProps> = ({ item }: IBasketElemProps) => {

    const dispatch = useAppDispatch();

    return (
        <article className="basket-elem">
            <div className="basket-elem__photo">
                <img src={`https://ecommerce-qttp.onrender.com${item.product.img[0]}`} alt="" />
            </div>
            <div className="basket-elem__info">
                <div className="basket-elem__info-close">
                    <div className="basket-elem__item-name">{item.product.title}</div>
                    <svg onClick={() => { if (item.product._id) { dispatch(fetchDeleteFromBasket({ id: item.product._id })); } }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
                </div>
                <div className="basket-elem__price-quantity">
                    <div className="basket-elem__count">
                        x{item.quantity}
                    </div>
                    <div className="basket-elem__price">
                        {item.product.price * item.quantity}$
                    </div>
                </div>
            </div>
        </article>
    );
}

export default BasketElem;
import React, { useState } from "react";
import "../styles/BasketElem.scss";
import { Product } from "../types/types";


export interface BasketElemProps {
    product: Product;
}

const BasketElem: React.FC<BasketElemProps> = ({ product }: BasketElemProps) => {
    const [count, setCount] = useState(1);
    return (
        <div className="basket-elem">
            <div className="basket-elem__photo">
                <img src={`http://localhost:4000${product.img[0]}`} alt="" />
            </div>
            <div className="basket-elem__info">
                <div className="basket-elem__info-close">
                    <div className="basket-elem__item-name">{product.title}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
                </div>
                <div className="basket-elem__price-quantity">
                    <div className="basket-elem__quantity">
                        <div className="basket-elem__quantity-block">
                            <button className="basket-elem__quantity-button" onClick={() => { if (count > 1) { setCount(prev => prev - 1); } }}>-</button>
                            <div className="basket-elem__quantity-text">{count}</div>
                            <button className="basket-elem__quantity-button" onClick={() => setCount(prev => prev + 1)}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasketElem;
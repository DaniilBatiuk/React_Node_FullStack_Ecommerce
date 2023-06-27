import React, { useEffect, useState } from "react";
import "../styles/Basket.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BasketElem from "./BasketElem";
export interface BasketProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}

const Basket: React.FC<BasketProps> = ({ active, setActive }: BasketProps) => {

    const { basket } = useSelector((state: RootState) => state.auth);

    const [sum, setSum] = useState(0);

    useEffect(() => {
        let totalPrice = 0;
        basket.forEach(item => {
            const { quantity, product } = item;
            const itemTotal = quantity * product.price;
            totalPrice += itemTotal;
        });
        setSum(totalPrice);
    }, [basket]);

    return (
        <div className={active ? "basket active" : "basket"} onClick={() => setActive(false)}>
            <div className={active ? "basket__content active" : "basket__content"} onClick={e => e.stopPropagation()}>
                <div className="basket__header">
                    <div className="basket__title title">Your Shopping Basket</div>
                    <svg onClick={() => setActive(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
                </div>
                <div className="basket__list">
                    {(basket.length !== 0) && (
                        basket.map((elem) => (
                            <BasketElem item={elem} key={elem.product._id} />
                        ))
                    )}
                </div>
                <div className="basket__footer">
                    <div className="basket__subtotal subtotal">
                        <div className="subtotal__text">Subtotal</div>
                        <div className="subtotal__price">{sum}$</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Basket;
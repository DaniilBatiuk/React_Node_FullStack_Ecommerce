import React from "react";
import "../styles/Basket.scss";

export interface BasketProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}

const Basket: React.FC<BasketProps> = ({ active, setActive }: BasketProps) => {

    return (
        <div className={active ? "basket active" : "basket"} onClick={() => setActive(false)}>
            <div className={active ? "basket__content active" : "basket__content"} onClick={e => e.stopPropagation()}>
                <div className="title">Your Shopping Basket</div>
                <div className="basket__list">
                    <div className="basket__item">
                    </div>
                </div>
                <div className="basket__footer">
                    <div className="basket__subtotal subtotal">
                        <div className="subtotal__text">Subtotal</div>
                        <div className="subtotal__price">45$</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Basket;
import React, { useState } from "react";
import "../styles/Basket.scss";
import photo from "../assets/photos/stul-lilu-seriy-44829735-77209 (1).jpg";
export interface BasketProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}

const Basket: React.FC<BasketProps> = ({ active, setActive }: BasketProps) => {
    const [count, setCount] = useState(1);
    return (
        <div className={active ? "basket active" : "basket"} onClick={() => setActive(false)}>
            <div className={active ? "basket__content active" : "basket__content"} onClick={e => e.stopPropagation()}>
                <div className="basket__title title">Your Shopping Basket</div>
                <div className="basket__list">
                    <div className="basket__item">
                        <div className="basket__photo">
                            <img src={photo} />
                        </div>
                        <div className="basket__info">
                            <div className="basket__info-close">
                                <div className="basket__item-name">Text text etxt text text tettxttextxt</div>
                                <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#000"></path>
                                </svg>
                            </div>
                            <div className="basket__price-quantity">
                                <div className="basket__quantity">
                                    <div className="basket__quantity-block">
                                        <button className="basket__quantity-button" onClick={() => { if (count > 1) { setCount(prev => prev - 1); } }}>-</button>
                                        <div className="basket__quantity-text">{count}</div>
                                        <button className="basket__quantity-button" onClick={() => setCount(prev => prev + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="basket__footer">
                        <div className="basket__subtotal subtotal">
                            <div className="subtotal__text">Subtotal</div>
                            <div className="subtotal__price">45.00$</div>
                        </div>
                    </div>
                </div>
            </div>
            );
}

            export default Basket;
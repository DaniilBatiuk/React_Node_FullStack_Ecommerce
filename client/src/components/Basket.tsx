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
                <div className="basket__header">
                    <div className="basket__title title">Your Shopping Basket</div>
                    <svg onClick={() => setActive(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
                </div>
                <div className="basket__list">
                    <div className="basket__item">
                        <div className="basket__photo">
                            <img src={photo} />
                        </div>
                        <div className="basket__info">
                            <div className="basket__info-close">
                                <div className="basket__item-name">Text text etxt text text tettxttextxt</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
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
                    <div className="basket__item">
                        <div className="basket__photo">
                            <img src={photo} />
                        </div>
                        <div className="basket__info">
                            <div className="basket__info-close">
                                <div className="basket__item-name">Text</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
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
        </div>
    );
}

export default Basket;
import axios from '../axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductInfo.scss";
import { Product } from '../types/types';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchAddToBasket, selectIsAuth } from '../redux/slices/auth';
import { useSelector } from 'react-redux';

const ProductInfo: React.FC = () => {
    const dispatch = useAppDispatch();

    const [product, setProduct] = useState<Product>();
    const [count, setCount] = useState(1);
    const [sum, setSum] = useState(0);
    const [mainPhoto, setMainPhoto] = useState("");
    const { id } = useParams();
    const { basket } = useSelector((state: RootState) => state.auth);
    const [errorText, setErrorText] = useState("");
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        axios.get(`/product/${id}`)
            .then((res) => {
                setProduct(res.data);
                setMainPhoto(`http://localhost:4000${res.data?.img[0]}`);
                setSum(res.data?.price);
            })
            .catch((err) => {
                console.warn(err);
            })
    }, []);

    useEffect(() => {
        setErrorText("");
    }, [isAuth]);


    const AddToBasket = () => {
        if (!isAuth) {
            setErrorText("You are not sing in");
        }
        else if (product?._id && !basket.some(item => item.product._id === product._id)) {
            dispatch(fetchAddToBasket({ id: product._id, quantity: count }));
            setErrorText("");
        }
        else {
            setErrorText("This product is already exist in your basket");
        }
    }

    return (
        <section className="product">
            <div className="product__container">
                <div className="product__title title" >{product?.title}</div>
                <div className="product__main">
                    <div className="product__photos photos">
                        <div className="photos__main">
                            <div className="photos__main-photo">
                                <img src={mainPhoto} alt="" />
                            </div>
                            <div className="photos__all">
                                {(product?.img.length !== 0) && (
                                    product?.img.map((elem) => (
                                        <div className="photos__litle-photo" key={elem}>
                                            <img src={`http://localhost:4000${elem}`} alt="" onClick={() => setMainPhoto(`http://localhost:4000${elem}`)} />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="product__description description">
                        <div className="description__characteristic characteristic">
                            <div className="characteristic__text">Characteristic</div>
                            {(product?.img.length !== 0) && (
                                product?.characteristic.map((elem) => (
                                    <div className="characteristic__item" key={elem.title}>
                                        <div>{elem.title}:</div>
                                        <div className="characteristic__description">{elem.description}</div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="description__quantity quantity" style={{ marginBottom: errorText !== "" ? "20px" : "50px" }}>
                            <div className="quantity__name">Quantity</div>
                            <div className="quantity__block">
                                <button className="quantity__button" onClick={() => { if (count > 1) { setCount(prev => prev - 1); setSum(prev => prev - product!.price) } }}>-</button>
                                <div className="quantity__text">{count}</div>
                                <button className="quantity__button" onClick={() => { setCount(prev => prev + 1); setSum(prev => prev + product!.price) }}>+</button>
                            </div>
                            <div className="quantity__price">{sum}$</div>
                        </div>
                        {(errorText !== "") && (
                            <div className="alert alert-danger" role="alert">
                                <div>
                                    {errorText}
                                </div>
                            </div>
                        )}
                        <div className="description__buttons">
                            <button className="description__button-add" onClick={() => AddToBasket()}>ADD TO CARD</button>
                            <button className="description__button-buy-now">BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductInfo;
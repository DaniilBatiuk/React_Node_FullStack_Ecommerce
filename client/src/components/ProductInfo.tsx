import axios from '../axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductInfo.scss";
import { IProduct } from '../types/types';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchAddToBasket, selectIsAuth } from '../redux/slices/auth';
import { useSelector } from 'react-redux';
import Message from './Message';
import { scroll } from '../utils/functions';
import Loader from './UI/Modal/Loader/Loader';

const ProductInfo: React.FC = () => {
    const dispatch = useAppDispatch();

    const [product, setProduct] = useState<IProduct>();
    const [count, setCount] = useState(1);
    const [sum, setSum] = useState(0);
    const [mainPhoto, setMainPhoto] = useState("");
    const [errorText, setErrorText] = useState("");
    const [successTextActive, setSuccessTextActive] = useState(false);
    const [messageModalActive, setMessageModalActive] = useState(false);
    const { id } = useParams();

    const { basket, _id } = useSelector((state: RootState) => state.auth);
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        axios.get(`/product/${id}`)
            .then((res) => {
                setProduct(res.data);
                setMainPhoto(`https://ecommerce-qttp.onrender.com${res.data?.img[0]}`);
                setSum(res.data?.price);
            })
            .catch((err) => {
                console.warn(err);
            })
    }, [id]);

    useEffect(() => {
        setErrorText("");
    }, [isAuth]);

    useEffect(() => {
        scroll(document.getElementById(`scrollInfoConteiner${id}`) as HTMLDivElement);
    }, [product]);

    const AddToBasket = () => {
        if (!isAuth) {
            setErrorText("You are not sing in");
            setSuccessTextActive(false);
        }
        else if (_id === product?.user._id) {
            setErrorText("You can not add your product in your backet");
            setSuccessTextActive(false);
        }
        else if (product?._id && !basket.some(item => item.product._id === product._id)) {
            dispatch(fetchAddToBasket({ id: product._id, quantity: count }));
            setErrorText("");
            setSuccessTextActive(true);
        }
        else {
            setErrorText("This product is already exist in your basket");
            setSuccessTextActive(false);
        }
    }

    if (product === undefined) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <section className="product">
                <div className="product__container">
                    <h2 className="product__title title" >{product?.title}</h2>
                    <div className="product__main">
                        <div className="product__photos photos">
                            <div className="photos__main">
                                <div className="photos__main-photo">
                                    <img src={mainPhoto} alt="" className="img-fluid" />
                                </div>
                                <div className="photos__all" id={`scrollInfoConteiner${id}`} >
                                    {(product?.img.length !== 0) && (
                                        product?.img.map((elem) => (
                                            <div className="photos__litle-photo" key={elem}>
                                                <img src={`https://ecommerce-qttp.onrender.com${elem}`} alt="" className="img-fluid" onClick={() => setMainPhoto(`https://ecommerce-qttp.onrender.com${elem}`)} />
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
                            <div className="description__quantity quantity" style={{ marginBottom: (errorText !== "" || successTextActive === true) ? "20px" : "50px" }}>
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
                            {(successTextActive === true) && (
                                <div className="alert alert-success" role="alert">
                                    <div>
                                        This product has successfully added to your basket
                                    </div>
                                </div>
                            )}
                            <div className="description__buttons">
                                <button className="description__button-add" onClick={() => AddToBasket()}>ADD TO CARD</button>
                                <button className="description__button-buy-now" onClick={() => { (isAuth) ? setMessageModalActive(true) : setErrorText("You are not sing in"); }}>BUY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Message active={messageModalActive} setActive={setMessageModalActive} message={`You can contact the owner of the product by this mail: ${product?.user.email}`} />
        </>
    );
}

export default ProductInfo;
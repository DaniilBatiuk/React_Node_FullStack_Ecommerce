import axios from '../axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Product.scss";
import { Product } from '../types/types';

const ProductSelect: React.FC = () => {
    const [product, setProduct] = useState<Product>();
    const [count, setCount] = useState(1);
    const [sum, setSum] = useState(0);
    const [mainPhoto, setMainPhoto] = useState("");
    const { id } = useParams();

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
                                        <div className="photos__litle-photo">
                                            <img src={`http://localhost:4000${elem}`} alt="" key={elem} onClick={() => setMainPhoto(`http://localhost:4000${elem}`)} />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="product__description description">
                        <div className="description__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque libero tenetur, natus eligendi adipisci tempore. Nulla error rem voluptate iste iure, officia omnis placeat possimus laborum perspiciatis. Repellat, voluptatum quibusdam.</div>
                        <div className="description__quantity quantity">
                            <div className="quantity__name">Quantity</div>
                            <div className="quantity__block">
                                <button className="quantity__button" onClick={() => { if (count > 1) { setCount(prev => prev - 1); setSum(prev => prev - product!.price) } }}>-</button>
                                <div className="quantity__text">{count}</div>
                                <button className="quantity__button" onClick={() => { setCount(prev => prev + 1); setSum(prev => prev + product!.price) }}>+</button>
                            </div>
                            <div className="quantity__price">{sum}$</div>
                        </div>
                        <div className="description__buttons">
                            <button className="description__button-add">ADD TO CART</button>
                            <button className="description__button-buy-now">BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductSelect;
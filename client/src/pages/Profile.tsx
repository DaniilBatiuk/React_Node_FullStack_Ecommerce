import React, { useEffect, useState } from 'react'
import "../styles/Profile.scss";
import user from '../assets/photos/user.png';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/products';
import { filterMyProductSelector } from '../redux/Selectors';
import ProductCard from '../components/ProductCard';

const Profile: React.FC = () => {

    const dispatch = useAppDispatch();

    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
    const [activeCout, setActiveCount] = useState(0);

    const { auth } = useSelector((state: RootState) => state);
    const { products } = useSelector((state: RootState) => state.product);

    const myProducts = useSelector(filterMyProductSelector(auth._id));
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        setActiveCount(products.reduce((acc, value) => {
            if (value.user._id === auth._id) return acc + 1;
            return acc;
        }, 0));
    }, [products]);

    const handleClick1 = () => {
        setIsActive1(!isActive1);
        setIsActive2(false);
    };

    const handleClick2 = () => {
        setIsActive2(!isActive2);
        setIsActive1(false);
    };


    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="title profile__title">Profile</h2>
                <div className="profile__header">
                    <div className="profile__icon">
                        <img className='profile__user' src={user}></img>
                    </div>
                    <div className="profile__header-info">
                        <div className="profile__email">
                            {auth.email}
                        </div>
                        <div className="profile__activity">
                            <div className="profile__seled">
                                <span className="profile__seled-count">
                                    0
                                </span>
                                <div className="profile__seled-text">
                                    seled
                                </div>
                            </div>
                            <div className="profile__active">
                                <div className="profile__active-count">
                                    {activeCout}
                                </div>
                                <div className="profile__active-text">
                                    active
                                </div>
                            </div>
                            <div className="profile__denied">
                                <div className="profile__denied-count">
                                    0
                                </div>
                                <div className="profile__denied-text">
                                    denied
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <nav className="profile__nav">
                    <ul className="profile__list">
                        <li>
                            <button className={`profile__link ${isActive1 ? 'active' : ''}`} onClick={handleClick1}>My Products</button>
                        </li>
                        <li>
                            <button className={`profile__link ${isActive2 ? 'active' : ''}`} onClick={handleClick2}>Profile</button>
                        </li>
                    </ul>
                </nav>
                {isActive1 && (
                    myProducts.length !== 0 ? (
                        <section className="profile__items">
                            {myProducts.map((elem) => (
                                <ProductCard key={elem._id} product={elem} myProfileProduct={true} />
                            ))}
                        </section>
                    ) : (
                        <h2 className="profile__error-text">No items</h2>
                    ))
                }
                {isActive2 &&
                    <section className="profile__information">
                        <div className="profile__info">
                            <div className="profile__characteristic">
                                Full Name:
                            </div>
                            <div className="profile__text">
                                {auth.fullName}
                            </div>
                        </div>
                        <div className="profile__info">
                            <div className="profile__characteristic">
                                Email:
                            </div>
                            <div className="profile__text">
                                {auth.email}
                            </div>
                        </div>
                        <div className="profile__info">
                            <div className="profile__characteristic">
                                Date created:
                            </div>
                            <div className="profile__text">
                                {auth.createdAt}
                            </div>
                        </div>
                    </section>
                }
            </div>
        </section>
    )
}

export default Profile;
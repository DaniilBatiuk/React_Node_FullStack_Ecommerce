import React, { useEffect } from "react";
import Gallery from "../components/Gallery";
import Trending from "../components/Trending";
import Living from "../components/Living";
import living1 from '../assets/photos/living1.jpg';
import living2 from '../assets/photos/living2.jpg';
import { ILivingInfo } from "../types/types";
import ProductsProud from "../components/ProductsProud";
import { RootState, useAppDispatch } from "../redux/store";
import { setTypeName } from "../redux/slices/types";
import { fetchProducts } from "../redux/slices/products";
import { useSelector } from "react-redux";
import Loader from "../components/UI/Modal/Loader/Loader";


const Home: React.FC = () => {

    const livingList: ILivingInfo[] = [
        {
            photo: living1,
            title: "Creative harmonious living",
            description:
                "Products are all made to standard sizes so that you can mix and match them freely",
            items: {
                flexDirection: "row",
            },
        },
        {
            photo: living2,
            title: "Comfortable design",
            description:
                "Any thing in the right combination can make your room more comfortable.",
            items: {
                flexDirection: "row-reverse",
            },
        },
    ];

    const dispatch = useAppDispatch();

    const { products } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(setTypeName("All"));
        dispatch(fetchProducts());
    }, [dispatch]);


    if (products.length === 0) {
        return (
            <Loader />
        )
    }


    return (
        <>
            <Gallery></Gallery>
            <ProductsProud></ProductsProud>
            <Living livingInfo={livingList[0]}></Living>
            <Trending></Trending>
            <Living livingInfo={livingList[1]}></Living>
        </>
    );
}

export default Home;
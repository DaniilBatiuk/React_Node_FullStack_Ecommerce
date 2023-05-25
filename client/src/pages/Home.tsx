import React, { useEffect } from "react";
import Gallery from "../components/Gallery";
import Trending from "../components/Trending";
import Living from "../components/Living";
import living1 from '../assets/photos/living1.jpg';
import living2 from '../assets/photos/living2.jpg';
import { LivingInfo } from "../types/types";
import ProductsProud from "../components/ProductsProud";
import { useAppDispatch } from "../redux/store";
import { setTypeName } from "../redux/slices/types";
import { fetchProducts } from "../redux/slices/products";


const Home: React.FC = () => {

    const livingList: LivingInfo[] = [
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

    useEffect(() => {
        dispatch(setTypeName("All"));
        dispatch(fetchProducts());
    }, [dispatch]);

    
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
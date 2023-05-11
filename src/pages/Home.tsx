import React from "react";
import "../styles/App.scss";
import Gallery from "../components/Gallery";
import ProductsList from "../components/ProductsList";
import Trending from "../components/Trending";
import Living from "../components/Living";
import living1 from '../photos/living1.jpg';
import living2 from '../photos/living2.jpg';
import { LivingInfo, Product, ProductAndTitleText } from "../types/types";
import chair1 from '../photos/chair1.jpg';
import chair2 from '../photos/chair2.jpg';
import sofa2 from '../photos/sofa2.jpg';
import sofa3 from '../photos/sofa3.jpg';
import nightstand2 from '../photos/nightstand2.jpg';
import nightstand3 from '../photos/nightstand3.jpg';
import table1 from '../photos/table1.jpg';
import table4 from '../photos/table4.jpg';



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

    const productList: Product[] = [
        { photo: chair1, title: "Chair M-45 Mustard corduroy", price: 88.99 },
        { photo: chair2, title: "Semi-bar chair B-125 Emerald corduroy", price: 70.99 },
        { photo: sofa2, title: "Corner sofa Loft Green", price: 1250.99 },
        { photo: sofa3, title: "Sofa Martin Jasmine 91", price: 1011.99 },
        { photo: nightstand2, title: "Asgard sideboard 1 chipboard Alaska", price: 155.99 },
        { photo: nightstand3, title: "Bedside table Canelli 1 50 Black", price: 450.99 },
        { photo: table1, title: "Table HT-001 D100 White", price: 230.99 },
        { photo: table4, title: "Corner table 120x80 Black", price: 225.99 }
    ];

    const productAndTitleText: ProductAndTitleText = {
        product: productList,
        titleText: {
            titleText: "Products we are proud of",
            classNames: "products-proud__title"
        }
    };

    return (
        <>
            <Gallery></Gallery>
            <ProductsList productAndTitleText={productAndTitleText}></ProductsList>
            <Living livingInfo={livingList[0]}></Living>
            <Trending></Trending>
            <Living livingInfo={livingList[1]}></Living>
        </>
    );
}

export default Home;
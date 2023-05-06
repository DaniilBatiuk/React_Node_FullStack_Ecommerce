import React from "react";
import ProductCard from "./UI/ProductCard/ProductCard";
import chair1 from '../photos/chair1.jpg';
import chair2 from '../photos/chair2.jpg';
import sofa2 from '../photos/sofa2.jpg';
import sofa3 from '../photos/sofa3.jpg';
import nightstand2 from '../photos/nightstand2.jpg';
import nightstand3 from '../photos/nightstand3.jpg';
import table1 from '../photos/table1.jpg';
import table4 from '../photos/table4.jpg';
import { Product } from "../types/types";


const ProductsProud: React.FC = () => {

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
    return (

        <section className="products-proud">
            <div className="products-proud__container">
                <div className="products-proud__title title">Products we are proud of</div>
                <div className="products-proud__items">
                    {productList.map((elem) =>
                        <ProductCard key={elem.title} product={elem} />
                    )}

                </div>
            </div>
        </section>
    );
}

export default ProductsProud;
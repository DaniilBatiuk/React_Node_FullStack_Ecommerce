import React from "react";
import CategoryNav from "../components/CategoryNav";
import ProductsList from "../components/ProductsList";
import chair1 from '../assets/photos/chair1.jpg';
import chair2 from '../assets/photos/chair2.jpg';
import sofa2 from '../assets/photos/sofa2.jpg';
import sofa3 from '../assets/photos/sofa3.jpg';
import nightstand2 from '../assets/photos/nightstand2.jpg';
import nightstand3 from '../assets/photos/nightstand3.jpg';
import table1 from '../assets/photos/table1.jpg';
import table4 from '../assets/photos/table4.jpg';
import chair3 from '../assets/photos/chair3.jpg';
import chair4 from '../assets/photos/chair4.jpg';
import sofa1 from '../assets/photos/sofa1.jpg';
import sofa4 from '../assets/photos/sofa4.jpg';
import sofa5 from '../assets/photos/sofa5.jpg';
import nightstand1 from '../assets/photos/nightstand1.jpg';
import nightstand4 from '../assets/photos/nightstand4.jpg';
import nightstand5 from '../assets/photos/nightstand5.jpg';
import { Product, ProductAndTitleText } from "../types/types";

const Categories: React.FC = () => {


  const productList: Product[] = [
    { photo: chair1, title: "Chair M-45 Mustard corduroy", price: 88.99 },
    { photo: chair2, title: "Semi-bar chair B-125 Emerald corduroy", price: 70.99 },
    { photo: sofa2, title: "Corner sofa Loft Green", price: 1250.99 },
    { photo: sofa3, title: "Sofa Martin Jasmine 91", price: 1011.99 },
    { photo: nightstand2, title: "Asgard sideboard 1 chipboard Alaska", price: 155.99 },
    { photo: nightstand3, title: "Bedside table Canelli 1 50 Black", price: 450.99 },
    { photo: table1, title: "Table HT-001 D100 White", price: 230.99 },
    { photo: table4, title: "Corner table 120x80 Black", price: 225.99 },
    { photo: chair3, title: "Semi-bar stool B-22 Copper-corduroy", price: 97.99 },
    { photo: chair4, title: "Semi-bar chair B-140-1 Azure", price: 112.99 },
    { photo: sofa1, title: "Sofa Luciano Gray", price: 988.99 },
    { photo: sofa4, title: "Sofa Orlando Ice", price: 891.99 },
    { photo: sofa5, title: "Sofa Dominic Gray", price: 399.99 },
    { photo: nightstand1, title: "Bedside table Teneta S120 Black", price: 459.99 },
    { photo: nightstand4, title: "Sideboard Bourbon 3 MDF Oak Nemo Latte", price: 170.99 },
    { photo: nightstand5, title: "Picasso cabinet Blue Lagoon MDF", price: 105.99 },
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
      titleText: "",
      classNames: ""
    }
  };


  return (
    <>
      <CategoryNav></CategoryNav>
      <ProductsList productAndTitleText={productAndTitleText}></ProductsList>
    </>
  );
}

export default Categories;
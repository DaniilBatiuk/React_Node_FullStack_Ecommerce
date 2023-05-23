import React from "react";
import CategoryNav from "../components/CategoryNav";
import ProductsList from "../components/ProductsList";


const Categories: React.FC = () => {

  return (
    <>
      <CategoryNav></CategoryNav>
      <ProductsList></ProductsList>
    </>
  );
}

export default Categories;
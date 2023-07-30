import React from "react";
import CategoryNav from "../components/CategoryNav";
import ProductsList from "../components/ProductsList";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Loader from "../components/UI/Modal/Loader/Loader";


const Categories: React.FC = () => {

  const { types } = useSelector((state: RootState) => state.type);

  if (types.length === 0) {
    return (
      <Loader />
    )
  }
  
  return (
    <>
      <CategoryNav></CategoryNav>
      <ProductsList></ProductsList>
    </>
  );
}

export default Categories;
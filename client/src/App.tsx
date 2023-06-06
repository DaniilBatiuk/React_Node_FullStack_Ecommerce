import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.scss";
import HeaderMenu from "./components/HeaderMenu";
import Footer from "./components/Footer";
import { useAppDispatch } from "./redux/store";
import { fetchProducts } from "./redux/slices/products";
import { fetchTypes } from "./redux/slices/types";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchTypes());
    dispatch(fetchAuthMe());
  }, [dispatch]);


  return (
    <>
      <HeaderMenu />
      <main className="main">
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  );
}

export default App;

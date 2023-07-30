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
    const fetchData = () => {
      dispatch(fetchProducts());
      dispatch(fetchTypes());
      if (window.localStorage.getItem('token')) {
        dispatch(fetchAuthMe());
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3600000);

    return () => clearInterval(intervalId);
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

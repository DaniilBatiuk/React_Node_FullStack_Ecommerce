import React from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import HeaderMenu from "./components/HeaderMenu";
import Footer from "./components/Footer";

function App() {
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

import React from "react";
import {Outlet} from "react-router-dom";
import "./styles/App.css";
import HeaderMenu from "./components/HeaderMenu";

function App() {
  return (
    <>
        <HeaderMenu/>
          <main className="main">
            <Outlet></Outlet>
          </main> 
        <footer className="footer">footer</footer> 
    </>
  );
}

export default App;

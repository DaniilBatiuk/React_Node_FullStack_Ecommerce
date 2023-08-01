import React from "react";
import "./Loader.scss";

const Loader: React.FC = () => {
    return (
        <div className="spinner-center">
            <div className="spinner-body">
                <div className="spinner-border" style={{ width: "3rem", height: "3rem", margin: "0 auto" }} role="status"></div>
                <p className="spinner-text">Loading...</p>
                <p className="spinner-under-text">If you load a page for the first time it can take about 40 seconds. This is because the server is deploy on a free-to-play.</p>
            </div>
        </div>
    );
}


export default Loader;
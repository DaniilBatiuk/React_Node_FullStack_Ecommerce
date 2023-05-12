import React from "react";
import gallery1 from '../assets/photos/gallery1.jpg';
import gallery2 from '../assets/photos/gallery2.jpg';
import gallery3 from '../assets/photos/gallery3.jpg';
import gallery4 from '../assets/photos/gallery4.jpg';
import gallery5 from '../assets/photos/gallery5.jpg';
import "../styles/Gallery.scss";



const Gallery: React.FC = () => {
  return (
    <section className="main__gallery gallery">
      <div className="gallery__container">
        <div className="gallery__items">
          <button className="gallery__item gallery__item_big">
            <img src={gallery1} alt="" />
            <div className="gallery__image-text">
              Live Comfortably
            </div>
          </button>
          <button className="gallery__item gallery__item">
            <img src={gallery2} alt="" />
            <div className="gallery__image-text">
              Chair
            </div>
          </button>
          <button className="gallery__item gallery__item">
            <img src={gallery3} alt="" />
            <div className="gallery__image-text">
              Nightstand
            </div>
          </button>
          <button className="gallery__item gallery__item">
            <img src={gallery4} alt="" />
            <div className="gallery__image-text">
              Sofa
            </div>
          </button>
          <button className="gallery__item gallery__item">
            <img src={gallery5} alt="" />
            <div className="gallery__image-text">
              Table
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
import React from "react";
import gallery from '../assets/photos/gallery.jpg';
import gallery0 from '../assets/photos/gallery0.jpg';
import gallery1 from '../assets/photos/gallery1.jpg';
import gallery2 from '../assets/photos/gallery2.jpg';
import gallery3 from '../assets/photos/gallery3.jpg';
import "../styles/Gallery.scss";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchProductsByType } from "../redux/slices/products";
import { Type, setTypeName } from "../redux/slices/types";
import { useSelector } from "react-redux";
import { ScrollUp } from "../utils/functions";

const galleryImages = [
  gallery0,
  gallery1,
  gallery2,
  gallery3,
]


const Gallery: React.FC = () => {

  const dispatch = useAppDispatch();
  
  const { types } = useSelector((state: RootState) => state.type);

  const SelectByType = (type: Type) => {
    dispatch(fetchProductsByType(type._id));
    dispatch(setTypeName(type.name));
  }

  return (
    <section className="main__gallery gallery">
      <div className="gallery__container">
        <div className="gallery__items">
          {(types.length !== 0) && (
            <Link to="/Categories/All" className="gallery__item gallery__item_big" onClick={() => { ScrollUp(); dispatch(setTypeName("All")); }}>
              <img src={gallery} alt="" />
              <div className="gallery__image-text">
                Live Comfortably
              </div>
            </Link>
          )}
          {(types.length !== 0) && (
            types.slice(0, 4).map((type, i) => (
              <Link to={`/Categories/${type.name}`} className="gallery__item gallery__item" key={type._id} onClick={() => { ScrollUp(); SelectByType(type); }}>
                <img src={galleryImages[i]} alt="" />
                <div className="gallery__image-text">
                  {type.name}
                </div>
              </Link>
            ))
          )}

        </div>
      </div>
    </section>
  );
}

export default Gallery;
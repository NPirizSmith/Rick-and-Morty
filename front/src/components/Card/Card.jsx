import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import { Link, useLocation } from "react-router-dom";
import Heart from "react-animated-heart";
import close from "../../assets/close.png";
import style from "./Card.module.css";

const Card = ({ id, name, status, species, gender, origin, image, onClose, isFavorite }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isFav, setIsFav] = useState(isFavorite);

  useEffect(() => {
    localStorage.setItem(`fav-${id}`, JSON.stringify(isFav));
  }, [id, isFav]);

  const handleFavorite = async () => {
    if (isFav) {
      await dispatch(removeFav(id));
    } else {
      await dispatch(addFav({ id, name, status, species, gender, origin, image }));
    }

    setIsFav((prevIsFav) => !prevIsFav);
  };

  return (
    <div className={style.main}>
      <div className={style.card}>
        <div className={style.cardContent}>
          <img src={image} alt={name} className={style.img} />
          <div className={style.p}>
            <h3 className={style.data}> {gender}</h3>
            <h3 className={style.data}>{status}</h3>
            <h3 className={style.data}>{species}</h3>
            <h3 className={style.data}>{origin?.name}</h3>
            <Link to={`/detail/${id}`}>
              <h4 className={style.seeMore}>See more details</h4>
            </Link>
          </div>
          <h2 className={style.h2}>{name}</h2>
          <div className={style.heart}>
            <Heart isClick={isFav} onClick={handleFavorite} />
          </div>
          {!location.pathname.includes("/favorites") && (
            <img
              src={close}
              onClick={() => onClose(id)}
              className={style.close}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

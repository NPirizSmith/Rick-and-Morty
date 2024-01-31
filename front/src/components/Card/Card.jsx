import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import { Link, useLocation } from "react-router-dom";
import Heart from "react-animated-heart";
import close from "../../assets/close.png";
import style from "./Card.module.css";

const Card = ({ id, name, status, species, gender, origin, image, onClose }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const myFavoritesNested = useSelector((state) => state.myFavorites);
  const myFavorites = myFavoritesNested.flat();

  // Utilizamos estado local para manejar la persistencia del corazón
  const [isFav, setIsFav] = useState(() => {
    // Recuperar el estado desde localStorage o false si no existe
    const localStorageState = localStorage.getItem(`fav-${id}`);
    return localStorageState ? JSON.parse(localStorageState) : false;
  });

  useEffect(() => {
    // Guardar el estado en localStorage cuando cambia
    localStorage.setItem(`fav-${id}`, JSON.stringify(isFav));
  }, [id, isFav]);

  const handleFavorite = async () => {
    if (isFav) {
      await dispatch(removeFav(id));
    } else {
      await dispatch(addFav({ id, name, status, species, gender, origin, image }));
    }

    // Toggle el estado local después de la acción Redux
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

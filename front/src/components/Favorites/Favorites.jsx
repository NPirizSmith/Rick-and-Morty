import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCards, orderCards, clearFilter } from "../../redux/actions";
import Card from "../Card/Card";
import style from "./Favorites.module.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);
  const favoriteIds = myFavorites.flat().map((favorite) => favorite.id);

  useEffect(() => {
    dispatch(clearFilter());
  }, [dispatch]);

  const isFavorite = (id) => {
    return favoriteIds.includes(id);
  };

  const handleOrder = (e) => {
    const order = e.target.value;
    dispatch(orderCards(order));
    dispatch(clearFilter());
  };

  const handleFilter = (e) => {
    const filter = e.target.value;
    if (filter === "All Genders") {
      dispatch(clearFilter());
    } else {
      dispatch(filterCards(filter));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.favorites}>
        <div className={style.order}>
          <div className={style.select}>
            <select onChange={handleOrder}>
              <option className={style.disabled} value="" disabled selected>
                Sort by ID
              </option>
              <option value="A">Ascending</option>
              <option value="D">Descending</option>
            </select>
          </div>
        </div>

        <div className={style.gender}>
          <div className={style.select}>
            <select onChange={handleFilter}>
              <option className={style.disabled} value="" disabled selected>
                Order by gender
              </option>
              <option value="All Genders">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>

        {myFavorites.flat().map(({ id, name, status, species, gender, origin, image }) => (
          <div className={style.containerCards} key={id}>
            <Card
              id={id}
              name={name}
              status={status}
              species={species}
              gender={gender}
              origin={origin?.name}
              image={image}
              isFavorite={isFavorite(id)} // Marcar si es favorito
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

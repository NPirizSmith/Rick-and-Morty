import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { filterCards, orderCards, clearFilter } from "../../redux/actions";
import { useState, useEffect } from "react";
import style from "./Favorites.module.css";


const Favorites = () => {
  const dispatch = useDispatch();
  const myFavorites = useSelector(state => state.myFavorites);
  const [aux, setAux] = useState(false);

  useEffect(() => {
    dispatch(clearFilter());
  }, [dispatch]);

  const handleOrder = (e) => {
    const order = e.target.value;
    dispatch(orderCards(order));
    setAux(true);
  };

  useEffect(() => {
    if (aux) {
      setAux(false);
    }
  }, [myFavorites, aux]);

  const handleFilter = (e) => {
    const filter = e.target.value;
    if (filter === "All Genders") {
      dispatch(clearFilter());
    } else {
      dispatch(filterCards(filter));
    }  console.log(myFavorites)
  };
  console.log('myFavorites in component:', myFavorites);
  return (
    <div className={style.container}>
      <div className={style.favorites}>
        
        <div className={style.order}>
          <div className={style.select}>

        <select onChange={handleOrder}>
        <option className={style.disabled} value="" disabled selected>Sort by ID</option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>
          </div>
      </div>

      <div className={style.gender}>
          <div className={style.select}>
      <select onChange={handleFilter}>
      <option className={style.disabled} value="" disabled selected>Order by gender</option>
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
    />
  </div>
))}

    </div>
      </div>
  );
}

export default Favorites;
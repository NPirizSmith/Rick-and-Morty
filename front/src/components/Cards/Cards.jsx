import Card from '../Card/Card';
import style from './Cards.module.css';
import searchicon from "../../assets/searchicon.png";
import random from "../../assets/random.png";
import { useSelector } from 'react-redux';

export default function Cards({ characters, onClose }) {
  const myFavorites = useSelector(state => state.myFavorites);
  console.log('myFavorites in Cards component:', myFavorites);
  // Obtener los IDs de los personajes favoritos
  const favoriteIds = myFavorites.map(favorite => favorite.id);

  const isFavorite = (id) => {
    return favoriteIds.includes(id);
  };

  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.containerCards}>
          {characters.length === 0 ? (
            <div className={style.noCharactersMessage}>
              Search for a character by ID  <img src={searchicon} alt="Search Icon" className={style.searchIcon} /> or generate one randomly <img src={random} className={style.random} />
            </div>
          ) : (
            characters.map(({ id, name, species, gender, image, origin, status }) => (
              <Card
                id={id}
                key={id}
                name={name}
                status={status}
                species={species}
                gender={gender}
                origin={origin.name}
                image={image}
                onClose={onClose}
                isFavorite={isFavorite(id)} // Marcar si es favorito
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

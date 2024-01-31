import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";
import arrowBack from "../../assets/arrowBack.png";
import aliveImage from "../../assets/alive.gif";
import deadImage from "../../assets/dead.gif";
import unknownImage from "../../assets/unknown.gif";

export default function Detail() {
  const { id } = useParams();

  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
      if (data.name) {
        setCharacter(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
    return setCharacter({});
  }, [id]);

  const getStatusImage = () => {
    // Determina el estado del personaje
    const characterStatus = character.status;
    let statusImage;

    // Asigna la imagen correspondiente según el estado
    if (characterStatus === "Alive") {
      statusImage = aliveImage;
    } else if (characterStatus === "Dead") {
      statusImage = deadImage;
    } else {
      statusImage = unknownImage;
    }

    return statusImage;
  };

  return (
    <div>
      <div className={style.container}>
        {character.image && <img className={style.img} src={character.image} alt={character.name} />}
        <Link to="/home">
          <img src={arrowBack} className={style.back} />
        </Link>
        <div className={style.cardDetails}>
          <div className={style.characterName}>
            {character.name && <h2>{character.name}</h2>}
          </div>
          <div className={style.characterInfo}>
          <div className={style.status}>
          {character.status && (
             <div ><p>Status: {character.status} <img src={getStatusImage()} alt={character.status} className={style.statusImage} /> </p> 
            </div>
          )}

          </div>
          {character.species && <p>Species: {character.species}</p>}
          {character.gender && <p>Gender: {character.gender}</p>}
          {character.origin && character.origin.name && <p>Origin: {character.origin.name}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

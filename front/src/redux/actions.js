import axios from "axios";

export const addFav = (character) => {
  return async (dispatch, getState) => {
    try {
      const endpoint = '/rickandmorty/fav';
      const response = await axios.post(endpoint, character);
      const data = response.data;

      // Obtén la lista actual de favoritos del estado
      const currentFavorites = getState().myFavorites;

      // Agrega el nuevo personaje a la lista actual
      const updatedFavorites = [...currentFavorites, data];

      dispatch({
        type: 'ADD_FAV',
        payload: updatedFavorites,
      });
    } catch (error) {
      console.error('Error adding character to favorites:', error);
    }
  };
};

export const removeFav = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `/rickandmorty/fav/${id}`;
      const response = await axios.delete(endpoint);
      const data = response.data;

      dispatch({
        type: 'REMOVE_FAV',
        payload: data,
      });
    } catch (error) {
      console.error('Error removing character from favorites:', error);
    }
  };
};

export const filterCards = (gender)=> {
    return{
    type: "FILTER",
    payload: gender
}
}

export const orderCards = (orden)=> {
    return{
        type:"ORDER",
        payload: orden
    }
}

export const clearFilter = () => ({
    type: "CLEAR"
  });

  


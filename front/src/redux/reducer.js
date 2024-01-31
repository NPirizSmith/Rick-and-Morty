const initialState = {
    myFavorites: [],
    allCharacters: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAV':
      console.log('Adding character to favorites. New state:', {
        myFavorites: action.payload,
        allCharacters: action.payload,
      });

      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };
        
        case 'REMOVE_FAV':
          return { ...state,
             myFavorites: action.payload, 
            allCharacters: action.payload};

            case "FILTER":
                return {
                  ...state,
                  myFavorites: [...state.allCharacters.filter((character) => character.gender === action.payload)]
                };

                case "CLEAR":
  return {
    ...state,
    myFavorites: state.allCharacters.slice(),
  };

                    


        case "ORDER":
            const orderCards = [...state.myFavorites];
            if (action.payload === "A") {
              orderCards.sort((a, b) => a.id - b.id);  // Orden ascendente
            } else if (action.payload === "D") {
              orderCards.sort((a, b) => b.id - a.id);  // Orden descendente
            }
            return {
              ...state,
              myFavorites: orderCards};

        default: 
            return {...state} 
    }
};

export default reducer
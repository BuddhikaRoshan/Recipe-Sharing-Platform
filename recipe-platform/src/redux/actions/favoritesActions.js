export const addToFavorites = (recipeId) => ({
    type: 'ADD_TO_FAVORITES',
    payload: recipeId,
  });
  
  export const removeFromFavorites = (recipeId) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: recipeId,
  });
  
  export const setFavorites = (favorites) => ({
    type: 'SET_FAVORITES',
    payload: favorites,
  });
  
  // Load favorites from local storage on app load
  export const loadFavorites = () => (dispatch) => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      dispatch(setFavorites(JSON.parse(storedFavorites)));
    }
  };
  
  // Save favorites to local storage whenever it changes
  export const saveFavorites = (favorites) => () => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
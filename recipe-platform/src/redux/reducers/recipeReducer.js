import {
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,
    CREATE_RECIPE_REQUEST,
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAILURE,
    UPDATE_RECIPE_REQUEST,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_RECIPE_FAILURE,
    DELETE_RECIPE_REQUEST,
    DELETE_RECIPE_SUCCESS,
    DELETE_RECIPE_FAILURE,
  } from '../actionTypes';
  
  const initialState = {
    loading: false,
    recipes: [],
    error: null,
    createSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
  };
  
  const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RECIPES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_RECIPES_SUCCESS:
        return { ...state, loading: false, recipes: action.payload };
      case FETCH_RECIPES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case CREATE_RECIPE_REQUEST:
        return { ...state, loading: true, error: null, createSuccess: false };
      case CREATE_RECIPE_SUCCESS:
        return { ...state, loading: false, recipes: [...state.recipes, action.payload], createSuccess: true };
      case CREATE_RECIPE_FAILURE:
        return { ...state, loading: false, error: action.payload, createSuccess: false };
      case UPDATE_RECIPE_REQUEST:
        return { ...state, loading: true, error: null, updateSuccess: false };
      case UPDATE_RECIPE_SUCCESS:
        return {
          ...state,
          loading: false,
          recipes: state.recipes.map((recipe) =>
            recipe.id === action.payload.id ? action.payload : recipe
          ),
          updateSuccess: true,
        };
      case UPDATE_RECIPE_FAILURE:
        return { ...state, loading: false, error: action.payload, updateSuccess: false };
      case DELETE_RECIPE_REQUEST:
        return { ...state, loading: true, error: null, deleteSuccess: false };
      case DELETE_RECIPE_SUCCESS:
        return {
          ...state,
          loading: false,
          recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
          deleteSuccess: true,
        };
      case DELETE_RECIPE_FAILURE:
        return { ...state, loading: false, error: action.payload, deleteSuccess: false };
      default:
        return state;
    }
  };
  
  export default recipeReducer;
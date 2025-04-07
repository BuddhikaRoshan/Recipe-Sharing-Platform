import { mockRecipeAPI } from '../../services/mockAPI';
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
} from '../actionTypes'; // Corrected import path

export const fetchRecipes = () => async (dispatch) => {
  dispatch({ type: FETCH_RECIPES_REQUEST });
  try {
    const recipes = await mockRecipeAPI.getAllRecipes();
    dispatch({ type: FETCH_RECIPES_SUCCESS, payload: recipes });
  } catch (error) {
    dispatch({ type: FETCH_RECIPES_FAILURE, payload: error.message });
  }
};

export const createRecipe = (recipeData) => async (dispatch) => {
  dispatch({ type: CREATE_RECIPE_REQUEST });
  try {
    const newRecipe = await mockRecipeAPI.createRecipe(recipeData);
    dispatch({ type: CREATE_RECIPE_SUCCESS, payload: newRecipe });
    return newRecipe;
  } catch (error) {
    dispatch({ type: CREATE_RECIPE_FAILURE, payload: error.message });
    throw error;
  }
};

export const updateRecipe = (id, updatedRecipeData) => async (dispatch) => {
  dispatch({ type: UPDATE_RECIPE_REQUEST });
  try {
    const updatedRecipe = await mockRecipeAPI.updateRecipe(id, updatedRecipeData);
    dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: updatedRecipe });
    return updatedRecipe;
  } catch (error) {
    dispatch({ type: UPDATE_RECIPE_FAILURE, payload: error.message });
    throw error;
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  dispatch({ type: DELETE_RECIPE_REQUEST });
  try {
    await mockRecipeAPI.deleteRecipe(id);
    dispatch({ type: DELETE_RECIPE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_RECIPE_FAILURE, payload: error.message });
  }
};
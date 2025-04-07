import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import recipeReducer from './reducers/recipeReducer';
import favoritesReducer from './reducers/favoritesReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  favorites: favoritesReducer,
  auth: authReducer
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.warn('Error saving state:', e);
  }
};

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)
);

store.subscribe(() => saveState(store.getState()));

export default store;

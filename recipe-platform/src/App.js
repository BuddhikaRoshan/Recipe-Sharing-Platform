import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus } from './redux/actions/authActions';
import { loadFavorites } from './redux/actions/favoritesActions';
import Layout from './components/Layout/Layout';
import Loading from './components/UI/Loading';

const Home = lazy(() => import('./pages/Home/Home'));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail/RecipeDetail'));
const Favorites = lazy(() => import('./pages/Favorites/Favorites'));
const NewRecipe = lazy(() => import('./pages/NewRecipe/NewRecipe'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup'));

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
    dispatch(loadFavorites());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route
              path="/favorites"
              element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />}
            />
            <Route
              path="/new-recipe"
              element={isAuthenticated ? <NewRecipe /> : <Navigate to="/login" />}
            />
            <Route
              path="/edit-recipe/:id"
              element={isAuthenticated ? <NewRecipe isEditing /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
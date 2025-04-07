import React from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const allRecipes = useSelector((state) => state.recipes.recipes);
  const recipesLoading = useSelector((state) => state.recipes.loading);

  const favoriteRecipes = allRecipes.filter((recipe) => favorites.includes(recipe.id));

  if (recipesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (favoriteRecipes.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">No favorite recipes yet!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
        My Favorite Recipes
      </Typography>
      <Grid container spacing={3}>
        {favoriteRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 500, color: '#333' }}>
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time: {recipe.cookingTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {recipe.rating}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;

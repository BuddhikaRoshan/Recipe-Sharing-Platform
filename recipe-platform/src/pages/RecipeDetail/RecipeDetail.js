import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Fab,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

import CookingTimer from '../../components/UI/CookingTimer';
import { mockRecipeAPI } from '../../services/mockAPI';
import { deleteRecipe } from '../../redux/actions/recipeActions';
import { updateRecipe } from '../../redux/actions/recipeActions';
import { addToFavorites, removeFromFavorites } from '../../redux/actions/favoritesActions';
import ingredientSubstitutions from '../../data/substitutions';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const favorites = useSelector((state) => state.favorites.favorites);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const isFavorite = favorites.includes(id);
  const isOwner = isAuthenticated && user && recipe?.createdBy === user.id;

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await mockRecipeAPI.getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(id));
      setSnackbarMessage('Removed from favorites');
      setSnackbarSeverity('info');
    } else {
      dispatch(addToFavorites(id));
      setSnackbarMessage('Added to favorites');
      setSnackbarSeverity('success');
    }
    setSnackbarOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteRecipe(recipe.id));
      navigate('/'); // Redirect to the home page after deletion
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason !== 'clickaway') setSnackbarOpen(false);
  };

  const handleUpdateRecipe = async (updatedRecipeData) => {
    try {
      await dispatch(updateRecipe(recipe.id, updatedRecipeData));
      navigate(`/recipe/${recipe.id}`);  // Redirect to the updated recipe detail page
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const getSubstitutionSuggestions = () => {
    return recipe.ingredients
      .map((ing) => {
        const key = ing.toLowerCase();
        if (ingredientSubstitutions[key]) {
          return { ingredient: ing, suggestions: ingredientSubstitutions[key] };
        }
        return null;
      })
      .filter(Boolean);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  if (!recipe) {
    return <Typography align="center">Recipe not found.</Typography>;
  }

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: '900px', margin: 'auto', boxShadow: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">{recipe.title}</Typography>

        {isOwner && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Edit recipe">
              <Fab
                color="primary"
                onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                size="small"
              >
                <EditIcon />
              </Fab>
            </Tooltip>

            <Tooltip title="Delete recipe">
              <Fab
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                size="small"
              >
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </Box>
        )}
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to permanently delete this recipe?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={handleDeleteConfirm}
            variant="contained"
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="subtitle1" color="text.secondary">
        Cooking Time: {recipe.cookingTime}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Created by: {recipe.creatorUsername}
      </Typography>

      <Button
        variant="outlined"
        onClick={handleFavoriteToggle}
        startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        sx={{ mb: 2 }}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FacebookShareButton url={window.location.href} quote={recipe.title}>
          <FacebookIcon size={36} round />
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href} title={recipe.title}>
          <TwitterIcon size={36} round />
        </TwitterShareButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>Ingredients</Typography>
      <List>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index} sx={{ paddingLeft: 0 }}>
            <ListItemText primary={ingredient} />
          </ListItem>
        ))}
      </List>

      {getSubstitutionSuggestions().length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>Substitution Suggestions</Typography>
          <List>
            {getSubstitutionSuggestions().map(({ ingredient, suggestions }) => (
              <ListItem key={ingredient}>
                <ListItemText
                  primary={`For ${ingredient}:`}
                  secondary={suggestions.join(', ')}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>Instructions</Typography>
      {recipe.instructions ? (
        recipe.instructions.split('\n').map((step, index) => (
          <Typography key={index} paragraph>{step}</Typography>
        ))
      ) : (
        <Typography>No instructions provided.</Typography>
      )}

      <CookingTimer />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default RecipeDetail;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createRecipe, updateRecipe, fetchRecipes } from '../../redux/actions/recipeActions';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Tooltip,
} from '@mui/material';

const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'];

const NewRecipe = ({ isEditing }) => {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipes, loading, error, createSuccess, updateSuccess } = useSelector((state) => state.recipes);
  const authUserId = useSelector(state => state.auth.user?.id); // Get authUserId outside
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isEditing && recipeId && recipes) {
      const recipeToEdit = recipes.find((recipe) => recipe.id === recipeId);
      if (recipeToEdit) {
        setTitle(recipeToEdit.title);
        setDescription(recipeToEdit.description);
        setIngredients(recipeToEdit.ingredients);
        setInstructions(recipeToEdit.instructions);
        setCookingTime(recipeToEdit.cookingTime);
        setRating(String(recipeToEdit.rating));
        setImage(recipeToEdit.image);
        setDietaryRestrictions(recipeToEdit.dietaryRestrictions);
      }
    } else if (isEditing && recipeId && !recipes && !loading) {
      dispatch(fetchRecipes());
    }
  }, [isEditing, recipeId, recipes, dispatch, loading]);

  useEffect(() => {
    if (image) {
      setImagePreview(image);
    }
  }, [image]);

  useEffect(() => {
    if (!isSubmitting) return;

    if (!loading && !error) {
      if (!isEditing && createSuccess) {
        navigate("/"); // Redirect to homepage after successful creation
      } else if (isEditing && updateSuccess) {
        navigate(`/recipe/${recipeId}`);
      }
    }
    setIsSubmitting(false); // Reset submitting state after response (success or error)
  }, [
    loading, error, navigate, isEditing, recipeId, createSuccess, updateSuccess,
    recipes, title, authUserId, isSubmitting
  ]);

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleDietaryChange = (event) => {
    setDietaryRestrictions(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const recipeData = {
      title,
      description,
      ingredients: ingredients.filter((ing) => ing.trim() !== ''),
      instructions,
      cookingTime,
      rating: parseFloat(rating),
      image,
      dietaryRestrictions,
    };

    if (isEditing && recipeId) {
      dispatch(updateRecipe(recipeId, recipeData));
    } else {
      dispatch(createRecipe(recipeData)) // Wait for createRecipe success before navigating
        .then(() => {
          navigate("/"); // Redirect to homepage after successful creation
        })
        .catch((error) => {
          console.error('Error creating recipe:', error);
          setIsSubmitting(false);
        });
    }
  };

  if (loading && isEditing && recipeId && !recipes) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {isEditing ? 'Edit Recipe' : 'Add New Recipe'}
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                multiline
                rows={3}
              />
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Ingredients
              </Typography>
              {ingredients.map((ingredient, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TextField
                    fullWidth
                    label={`Ingredient ${index + 1}`}
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e)}
                  />
                  {ingredients.length > 1 && (
                    <Button onClick={() => removeIngredient(index)} sx={{ ml: 1 }}>
                      Remove
                    </Button>
                  )}
                </Box>
              ))}
              <Button onClick={addIngredient}>Add Ingredient</Button>
              <TextField
                fullWidth
                label="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                margin="normal"
                multiline
                rows={5}
                required
              />
              {/* Added Box with display flex to create a horizontal layout */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Cooking Time"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  margin="normal"
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Rating (e.g., 4.5)"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  margin="normal"
                  sx={{ flex: 1 }}
                />
              </Box>
              <TextField
                fullWidth
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                margin="normal"
              />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />}
              <FormControl fullWidth margin="normal">
                <InputLabel id="dietary-restrictions-label">Dietary Restrictions</InputLabel>
                <Select
                  labelId="dietary-restrictions-label"
                  id="dietary-restrictions"
                  multiple
                  value={dietaryRestrictions}
                  onChange={handleDietaryChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {dietaryOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={dietaryRestrictions.includes(option)} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ mt: 1 }}>
                {dietaryRestrictions.map((restriction) => (
                  <Chip key={restriction} label={restriction} sx={{ mr: 1 }} />
                ))}
              </Box>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : (isEditing ? 'Update Recipe' : 'Add Recipe')}
              </Button>
              <Button onClick={() => navigate(-1)} sx={{ mt: 2, ml: 2 }}>
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default NewRecipe;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../../redux/actions/recipeActions';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'];

const Home = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (recipes !== undefined) {
      let results = [...(recipes || [])];

      results = results.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedDietaryRestrictions.length > 0) {
        results = results.filter((recipe) =>
          selectedDietaryRestrictions.every((restriction) =>
            recipe.dietaryRestrictions && recipe.dietaryRestrictions.includes(restriction)
          )
        );
      }

      setFilteredRecipes(results);
    }
  }, [recipes, searchTerm, selectedDietaryRestrictions]);

  const handleDietaryChange = (event) => {
    setSelectedDietaryRestrictions(event.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error loading recipes: {error}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Animated Search and Filter Bar - Inline Alignment */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        sx={{ mb: 3 }} // Reduced the margin here slightly
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search Recipes"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1, minWidth: '300px' }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="dietary-restrictions-label">Dietary Restrictions</InputLabel>
            <Select
              labelId="dietary-restrictions-label"
              id="dietary-restrictions"
              multiple
              value={selectedDietaryRestrictions}
              onChange={handleDietaryChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {dietaryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={selectedDietaryRestrictions.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </motion.div>

      {/* Animated Recipe Grid with Top Margin */}
      <AnimatePresence mode="wait">
        <Grid
          container
          spacing={3}
          key={searchTerm + selectedDietaryRestrictions.join(',')}
          sx={{ mt: 3 }} // Added margin-top here
        >
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.image}
                    alt={recipe.title}
                    sx={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Time: {recipe.cookingTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Rating: {recipe.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recipe.dietaryRestrictions?.length > 0 &&
                        `Diet: ${recipe.dietaryRestrictions.join(', ')}`}
                    </Typography>
                  </CardContent>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/recipe/${recipe.id}`}
                    sx={{ mb: 2, mx: 2 }}
                  >
                    View Details
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </AnimatePresence>
    </Container>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { mockRecipeAPI } from '../../services/mockAPI';
import { deleteRecipe } from '../../redux/actions/recipeActions';
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
  IconButton, // Import IconButton for icon buttons
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addToFavorites, removeFromFavorites } from '../../redux/actions/favoritesActions';
import CookingTimer from '../../components/UI/CookingTimer';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
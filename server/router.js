'use strict';
import express from 'express';
import {getAllRecipes, getRecipe, getRecipesByCategory, getLastAddedRecipes, postRecipe} from './controllers/recipeController.js';
import {getAllCategories} from './controllers/categoryController.js';

const router = express.Router();

router.get('/recipes', getAllRecipes);
router.get('/recipes/latest', getLastAddedRecipes);
router.get('/recipes/:recipeId', getRecipe);
router.get('/recipes/category/:category', getRecipesByCategory);

router.post('/recipe', postRecipe);

router.get('/categories', getAllCategories);


export default router;
'use strict';
import express from 'express';
import {getAllCategories} from './controllers/categoryController.js';
import {getAllRecipes, getRecipe, getRecipesByCategory, getLastAddedRecipes, postRecipe} from './controllers/recipeController.js';
import {login, updateUploaded} from './controllers/userController.js';

const router = express.Router();

router.get('/recipes', getAllRecipes);
router.get('/recipes/latest', getLastAddedRecipes);
router.get('/recipes/:recipeId', getRecipe);
router.get('/recipes/category/:category', getRecipesByCategory);

router.post('/recipe', postRecipe);

router.get('/categories', getAllCategories);

router.post('/user/authenticate', login);
router.put('/user/uploaded', updateUploaded);

export default router;
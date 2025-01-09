'use strict';
import mongoose from 'mongoose';
import Category from '../models/category.js';
import Recipe from './../models/recipe.js';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const alphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
  'y', 'z', '1', '2', '3', '4', '5', '6',
  '7', '8', '9'
];
const recipes = [];
const categories = [];

const clearDatabase = async () => {
  await Recipe.deleteMany();
  await Category.deleteMany();
  console.log('MongoDB cleared!');
};

const formatRecipe = (recipe) => {
  if (!categories.includes(recipe.strCategory)) {
    categories.push(recipe.strCategory);
  }
  const ingredients = [];
  for (let i=1; i<101; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (!ingredient && !measure) {
      break;
    } else if (ingredient.trim() === '' && measure.trim() === '') {
      continue;
    }
    ingredients.push({
      ingredient: ingredient.trim(),
      measure: measure.trim()
    });
  }

  return {
    name: recipe.strMeal,
    // TODO area: recipe.strArea,
    category: recipe.strCategory,
    instructions: recipe.strInstructions.split('\r\n').filter(instr => instr.trim() !== ''),
    image: recipe.strMealThumb,
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
    ingredients: ingredients,
    cookingTimeInMinutes: 45,
  };
};

const fillDatabase = async () => {
  for (const letter of alphabet) {
    const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
    const data = await response.json();
    if (data.meals) {
      data.meals.map(meal => recipes.push(meal));
    }
  }

  const formattedRecipes = recipes.map(recipe => formatRecipe(recipe));
  await Recipe.insertMany(formattedRecipes);
  const formattedCategories = categories.map(category => ({name: category}));
  await Category.insertMany(formattedCategories);
  console.log('MongoDB filled successfully!');
};

(async () => {
  await clearDatabase();
  await fillDatabase();
  await mongoose.disconnect();
  console.log('Disconnected to MongoDB!');
})();
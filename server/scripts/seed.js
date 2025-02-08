"use strict";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Category from "../models/category.js";
import Recipe from "./../models/recipe.js";
import User from "./../models/user.js";
import { categories as categoryImages } from "../../client/src/utils/imagePaths.js";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
const recipes = [];
const categories = [];
const cloudinaryUrl = `https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856/`;

const clearDatabase = async () => {
  await Recipe.deleteMany();
  await Category.deleteMany();
  await User.deleteMany();
  console.log("MongoDB cleared!");
};

const formatRecipe = (recipe) => {
  if (!categories.includes(recipe.strCategory)) {
    categories.push(recipe.strCategory);
  }
  const ingredients = [];
  for (let i = 1; i < 101; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (!ingredient && !measure) {
      break;
    } else if (ingredient.trim() === "" && measure.trim() === "") {
      continue;
    }
    ingredients.push({
      ingredient: ingredient.trim(),
      measure: measure.trim(),
    });
  }

  return {
    name: recipe.strMeal,
    // TODO area: recipe.strArea,
    category: recipe.strCategory,
    instructions: recipe.strInstructions
      .split("\r\n")
      .filter((instr) => instr.trim() !== ""),
    image: recipe.strMealThumb,
    tags: recipe.strTags
      ? recipe.strTags.split(",").map((tag) => tag.trim())
      : [],
    ingredients: ingredients,
    cookingTimeInMinutes: 45,
  };
};

const fillDatabase = async () => {
  for (const letter of alphabet) {
    const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
    const data = await response.json();
    if (data.meals) {
      data.meals.map((meal) => recipes.push(meal));
    }
  }

  const formattedRecipes = recipes.map((recipe) => formatRecipe(recipe));
  await Recipe.insertMany(formattedRecipes);
  const formattedCategories = categories.map((category) => ({
    name: category,
    image: `${cloudinaryUrl}${categoryImages[category]}.jpg`,
  }));
  await Category.insertMany(formattedCategories);
  const user = {
    firstname: "Zappe",
    lastname: "Thomson",
    email: "zappe.thomson@test.com",
    password: "Test123!",
  };
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  await User.create({
    ...user,
    password: hashedPassword,
  });
  console.log("MongoDB filled successfully!");
};

(async () => {
  await clearDatabase();
  await fillDatabase();
  await mongoose.disconnect();
  console.log("Disconnected to MongoDB!");
})();

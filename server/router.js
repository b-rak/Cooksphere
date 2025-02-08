"use strict";
import express from "express";
import { getAllCategories } from "./controllers/categoryController.js";
import {
  getRecipes,
  getRecipe,
  getRecipesByCategory,
  getLastAddedRecipes,
  postRecipe,
  postReview,
} from "./controllers/recipeController.js";
import {
  login,
  updateUploaded,
  updateFavorites,
} from "./controllers/userController.js";

const router = express.Router();

router.get("/recipes", getRecipes);
router.get("/recipes/latest", getLastAddedRecipes);
router.get("/recipes/:recipeId", getRecipe);
router.get("/recipes/category/:category", getRecipesByCategory);

router.post("/recipe", postRecipe);
router.put("/recipes/:recipeId", postReview);

router.get("/categories", getAllCategories);

router.post("/user/authenticate", login);
router.put("/user/uploaded", updateUploaded);
router.put("/user/favorites", updateFavorites);

router.get("/status", (req, res) => {
  res.status(200).send("Server is running ✨🚀");
});

router.post("/", (req, res) => {
  res.status(200).json(req.body);
});

router.get("/PORT", (req, res) => {
  const PORT = process.env.PORT || 3000;
  res.status(404).send(`Server listening on port ${PORT} 🙌✨`);
});

export default router;

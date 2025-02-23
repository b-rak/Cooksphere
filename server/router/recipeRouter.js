"use strict";
import { Router } from "express";
import {
  getLastAddedRecipes,
  getRecipe,
  getRecipes,
  getRecipesByCategory,
  postRecipe,
  postReview,
} from "../controllers/recipeController.js";

const recipeRouter = Router();

recipeRouter.get("/", getRecipes);
recipeRouter.get("/latest", getLastAddedRecipes);
recipeRouter.get("/:recipeId", getRecipe);
recipeRouter.get("/category/:category", getRecipesByCategory);

recipeRouter.post("/", postRecipe);
recipeRouter.put("/:recipeId", postReview);

export default recipeRouter;

"use strict";
import Recipe from "./../models/recipe.js";

const getRecipes = async (req, res) => {
  try {
    if (!req.query) {
      const recipes = await Recipe.find();
      return res.status(200).send(recipes);
    } else {
      const searchQuery = req.query["q"];
      const recipes = await Recipe.find({ $text: { $search: searchQuery } });
      return res.status(200).send(recipes);
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: { message: "Error getting recipes!", code: 500 } });
  }
};

const getRecipe = async (req, res) => {
  try {
    const id = req.params.recipeId;
    if (!id) {
      return res
        .status(400)
        .send({ error: { message: "No recipe id provided!", code: 400 } });
    }
    const recipe = await Recipe.findOne({ _id: id });
    return res.status(200).send(recipe);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: { message: "Error getting recipe!", code: 500 } });
  }
};

const getRecipesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    if (!category) {
      return res
        .status(400)
        .send({ error: { message: "No category provided!", code: 400 } });
    }
    const recipes = await Recipe.find({ category });
    return res.status(200).send(recipes);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: { message: "Error getting recipes!", code: 500 } });
  }
};

const getLastAddedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(10);
    return res.status(200).send(recipes);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: { message: "Error getting recipes!", code: 500 } });
  }
};

const postRecipe = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res
        .status(400)
        .send({ error: { message: "Request body missing!", code: 400 } });
    }
    const recipe = await Recipe.create(body);
    return res.status(201).send(recipe);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: { message: "Error creating recipe!", code: 500 } });
  }
};

const postReview = async (req, res) => {
  try {
    const { rating, message } = req.body;
    if (!rating && !message) {
      return res
        .status(400)
        .send({ error: { message: "Missing rating or review!", code: 400 } });
    }
    const id = req.params.recipeId;
    if (!id) {
      return res
        .status(400)
        .send({ error: { message: "No recipe id provided!", code: 400 } });
    }
    const recipe = await Recipe.findOne({ _id: id });
    const oldRating = recipe.rating;

    recipe.reviews.push(req.body);
    const newRating = parseFloat(
      ((oldRating + rating) / recipe.reviews.length).toFixed(2)
    );
    recipe.rating = newRating;
    await recipe.save();
    return res.status(200).send(req.body);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: { message: "Error adding review!", code: 500 } });
  }
};

export {
  getLastAddedRecipes,
  getRecipe,
  getRecipes,
  getRecipesByCategory,
  postRecipe,
  postReview,
};

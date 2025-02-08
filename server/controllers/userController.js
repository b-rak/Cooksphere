"use strict";
import User from "./../models/user.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .send({ error: { message: "Missing credentials!", code: 401 } });
    }

    const user = await User.findOne({ email })
      .populate("uploadedRecipes")
      .populate("favoriteRecipes");
    if (!user) {
      return res.status(401).send({ error: "Wrong credentials" });
    }

    if (bcrypt.compareSync(password, user.password)) {
      return res.send(user);
    } else {
      return res.status(401).send({ error: "Wrong credentials" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: { message: "Error getting user!", code: 500 } });
  }
};

const updateUploaded = async (req, res) => {
  try {
    const { user, recipe } = req.body;
    if (!user) {
      return res
        .status(400)
        .send({ error: { message: "Missing user!", code: 400 } });
    } else if (!recipe) {
      return res
        .status(400)
        .send({ error: { message: "Missing recipe!", code: 400 } });
    }

    const userDB = await User.findOne({ email: user.email });
    userDB.uploadedRecipes.push(recipe);
    await userDB.save();
    res.send(userDB);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({
        error: {
          message: "Error updated uploaded recipes for user!",
          code: 500,
        },
      });
  }
};

const updateFavorites = async (req, res) => {
  try {
    const { user, recipe, favorite } = req.body;
    if (!user) {
      return res
        .status(400)
        .send({ error: { message: "Missing user!", code: 400 } });
    } else if (!recipe) {
      return res
        .status(400)
        .send({ error: { message: "Missing recipe!", code: 400 } });
    }

    const userDB = await User.findOne({ email: user.email });
    if (favorite) {
      userDB.favoriteRecipes.push(recipe);
    } else {
      userDB.favoriteRecipes = userDB.favoriteRecipes.filter(
        (favorite) => favorite.toString() !== recipe._id
      );
    }
    await userDB.save();
    res.send(userDB);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({
        error: {
          message: "Error updated uploaded recipes for user!",
          code: 500,
        },
      });
  }
};

export { login, updateUploaded, updateFavorites };

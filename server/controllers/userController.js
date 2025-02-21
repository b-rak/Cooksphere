"use strict";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./../models/user.js";

const rounds = process.env.SALT_ROUNDS || 10;
const SECRET_KEY = process.env.SECRET_KEY || "default";

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
      const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
      return res.status(200).send({ accessToken });
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

const createUser = async (req, res) => {
  try {
    const { gender, firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .send({ error: { message: "Missing user data!", code: 400 } });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).send({ error: "User already exists!" });
    }
    if (password.length < 8) {
      return res.status(409).send({ error: "Password is too short!" });
    }

    const hash = await bcrypt.hash(password, rounds);
    const newUser = await User.create({
      firstname,
      lastname,
      image: gender === "male" ? "man" : "woman",
      email,
      password: hash,
    });

    const accessToken = jwt.sign({ id: newUser._id }, SECRET_KEY);
    return res.status(201).send({ accessToken });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: { message: "Error creating user!", code: 500 } });
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
    return res.status(500).send({
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
    return res.status(500).send({
      error: {
        message: "Error updated uploaded recipes for user!",
        code: 500,
      },
    });
  }
};

const getUser = async (req, res) => {
  return res.status(200).send(req.user);
};

export { createUser, getUser, login, updateFavorites, updateUploaded };

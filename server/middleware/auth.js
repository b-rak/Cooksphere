"use strict";
import jwt from "jsonwebtoken";
import User from "./../models/user.js";
const SECRET_KEY = process.env.SECRET_KEY || "default";

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.status(403).send("Access token required!");
  const token = authHeaders.split(" ")[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: id })
      .populate("uploadedRecipes")
      .populate("favoriteRecipes");
    if (!user) return res.status(401).send("Authentication required!");
    req.user = user;
    next();
  } catch (e) {
    res.status(500).send("Error checking authentication status");
  }
};

export { authMiddleware };

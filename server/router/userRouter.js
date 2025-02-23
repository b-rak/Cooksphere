"use strict";
import { Router } from "express";
import {
  createUser,
  getUser,
  login,
  updateFavorites,
  updateUploaded,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";
const userRouter = Router();

userRouter.get("/", authMiddleware, getUser);
userRouter.post("/register", createUser);
userRouter.post("/authenticate", login);
userRouter.put("/uploaded", updateUploaded);
userRouter.put("/favorites", updateFavorites);

export default userRouter;

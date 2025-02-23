"use strict";
import { Router } from "express";
import { getAllCategories } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);

export default categoryRouter;

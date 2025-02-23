import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import recipeRouter from "./recipeRouter.js";
import userRouter from "./userRouter.js";

const rootRouter = Router();
rootRouter.all("*", (req, res) => {
  res.status(404).send("These are not the routes you are looking for");
});

const setRouting = (app) => {
  app.use("/categories", categoryRouter);
  app.use("/recipes", recipeRouter);
  app.use("/user", userRouter);
  app.use(rootRouter);
};

export default setRouting;

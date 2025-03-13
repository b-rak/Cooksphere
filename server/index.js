"use strict";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./models/index.js";
import setRouting from "./router/index.js";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const CLIENT_PORT = process.env.CLIENT_PORT || 5173;

app.use(cors({ origin: `http://localhost:${CLIENT_PORT}` }));
app.use(express.json());
setRouting(app);
connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

import dotenv from "dotenv";

dotenv.config();
process.env.DATABASE_NAME = process.env.TEST_DATABASE_NAME || "test_cooksphere";

import mongoose from "mongoose";
import { connectDB, disconnectDB } from "./models";

beforeAll(async () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await disconnectDB();
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

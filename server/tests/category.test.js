import { getAllCategories } from "../controllers/categoryController";
import categories from "../mocks/categories";
import Category from "../models/category";

jest.mock("../models/category.js");

describe("CategoryController", () => {
  describe("getAllCategories", () => {
    it("should return 200 with a list of all categories", async () => {
      Category.find.mockResolvedValue(categories);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getAllCategories(req, res);

      expect(Category.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(categories);
    });

    it("should return 500 if an error occurs", async () => {
      Category.find.mockRejectedValue(new Error("DB Error"));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getAllCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error getting categories!",
          code: 500,
        },
      });
    });
  });
});

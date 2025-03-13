import {
  getLastAddedRecipes,
  getRecipe,
  getRecipes,
  getRecipesByCategory,
  postRecipe,
  postReview,
} from "../controllers/recipeController";
import recipe from "../mocks/recipe";
import recipes from "../mocks/recipes";
import Recipe from "../models/recipe";

jest.mock("../models/recipe.js");

describe("RecipeController", () => {
  describe("getRecipes", () => {
    it("should return 200 with a list of all recipes", async () => {
      Recipe.find.mockResolvedValue(recipes);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getRecipes(req, res);

      expect(Recipe.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(recipes);
    });

    it("should return 200 with a list of all recipes matching the query", async () => {
      Recipe.find.mockResolvedValue(recipes[1]);

      const req = {
        query: {
          q: "ing3",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getRecipes(req, res);

      expect(Recipe.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(recipes[1]);
    });

    it("should return 500 if an error occurs", async () => {
      Recipe.find.mockRejectedValue(new Error("DB Error"));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getRecipes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error getting recipes!",
          code: 500,
        },
      });
    });
  });

  describe("getRecipe", () => {
    it("should return 200 with the recipe", async () => {
      Recipe.findOne.mockResolvedValue(recipe);

      const req = {
        params: {
          recipeId: 123,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getRecipe(req, res);

      expect(Recipe.findOne).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(recipe);
    });

    it("should return 400 if there is no recipeId", async () => {
      const req = {
        params: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "No recipe id provided!",
          code: 400,
        },
      });
    });

    it("should return 500 if an error occurs", async () => {
      Recipe.findOne.mockRejectedValue(new Error("DB Error"));

      const req = {
        params: {
          recipeId: 123,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error getting recipe!",
          code: 500,
        },
      });
    });
  });

  describe("postRecipe", () => {
    it("should return 201 with the created recipe", async () => {
      Recipe.create.mockResolvedValue(recipe);

      const req = { body: recipe };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await postRecipe(req, res);

      expect(Recipe.create).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(recipe);
    });

    it("should return 400 if the request body is missing", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await postRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Request body missing!",
          code: 400,
        },
      });
    });

    it("should return 500 if an error occurs", async () => {
      Recipe.create.mockRejectedValue(new Error("DB Error"));

      const req = {
        body: recipe,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await postRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error creating recipe!",
          code: 500,
        },
      });
    });
  });

  describe("getLastAddedRecipes", () => {
    it("should return 200 with a list of the 10 latest recipes", async () => {
      Recipe.find = jest.fn(() => ({
        sort: jest.fn(() => ({
          limit: jest.fn().mockResolvedValue(recipes),
        })),
      }));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getLastAddedRecipes(req, res);

      expect(Recipe.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(recipes);
    });

    it("should return 500 if an error occurs", async () => {
      Recipe.find = jest.fn(() => ({
        sort: jest.fn(() => ({
          limit: jest.fn().mockRejectedValue(new Error("DB Error")),
        })),
      }));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getLastAddedRecipes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error getting recipes!",
          code: 500,
        },
      });
    });
  });

  describe("getRecipesByCategory", () => {
    it("should return 200 with the category's recipes", async () => {
      Recipe.find.mockResolvedValue(recipes);

      const req = {
        params: {
          category: "Dessert",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getRecipesByCategory(req, res);

      expect(Recipe.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(recipes);
    });

    it("should return 400 no category is provided", async () => {
      const req = {
        params: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getRecipesByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "No category provided!",
          code: 400,
        },
      });
    });

    it("should return 500 if an error occurs", async () => {
      Recipe.find.mockRejectedValue(new Error("DB Error"));

      const req = {
        params: {
          category: "Dessert",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getRecipesByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error getting recipes!",
          code: 500,
        },
      });
    });
  });

  describe("postReview", () => {
    it("should return 200 with the added review", async () => {
      Recipe.findOne = jest.fn(() => ({
        ...recipe,
        save: jest.fn(),
      }));

      const req = {
        body: { rating: 5, message: "Test Review" },
        params: { recipeId: 123 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await postReview(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        rating: 5,
        message: "Test Review",
      });
    });

    it("should return 400 if the request body is missing", async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await postReview(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Missing rating or review!",
          code: 400,
        },
      });
    });

    it("should return 400 if the request params is missing", async () => {
      const req = { body: { rating: 5, message: "Test Review" }, params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await postReview(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "No recipe id provided!",
          code: 400,
        },
      });
    });

    it("should return 500 if an error occurs", async () => {
      Recipe.findOne.mockRejectedValue(new Error("DB Error"));

      const req = {
        body: { rating: 5, message: "Test Review" },
        params: { recipeId: 123 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await postReview(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error adding review!",
          code: 500,
        },
      });
    });
  });
});

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUser,
  login,
  updateFavorites,
  updateUploaded,
} from "../controllers/userController";
import recipe from "../mocks/recipe";
import user from "../mocks/user";
import User from "../models/user";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user.js");

describe("UserController", () => {
  describe("login", () => {
    it("should return 200 with the accesstoken", async () => {
      User.findOne = jest.fn(() => ({
        populate: jest.fn(() => ({
          populate: jest.fn().mockResolvedValue(user),
        })),
      }));
      jwt.sign.mockReturnValue("testToken");
      bcrypt.compareSync.mockReturnValue(true);

      const req = { body: { email: "mail@test.com", password: "Test123!" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ accessToken: "testToken" });
    });

    it("should return 401 when credentials are missing", async () => {
      const req = { body: { email: "", password: "" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Missing credentials!",
          code: 401,
        },
      });
    });

    it("should return 401 when there is no user found", async () => {
      User.findOne = jest.fn(() => ({
        populate: jest.fn(() => ({
          populate: jest.fn().mockResolvedValue(null),
        })),
      }));

      const req = { body: { email: "mail@test.com", password: "Test123!" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        error: "Wrong credentials",
      });
    });

    it("should return 401 when the password is wrong", async () => {
      User.findOne = jest.fn(() => ({
        populate: jest.fn(() => ({
          populate: jest.fn().mockResolvedValue(user),
        })),
      }));
      jwt.sign.mockReturnValue("testToken");
      bcrypt.compareSync.mockReturnValue(false);

      const req = { body: { email: "mail@test.com", password: "Test123?" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        error: "Wrong credentials",
      });
    });

    it("should return 500 if an error occurs", async () => {
      User.findOne = jest.fn(() => ({
        populate: jest.fn(() => ({
          populate: jest.fn().mockRejectedValue(new Error("DB Error")),
        })),
      }));

      const req = { body: { email: "mail@test.com", password: "Test123!" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error getting user!",
          code: 500,
        },
      });
    });
  });

  describe("createUser", () => {
    it("should return 201 with the accesstoken", async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockReturnValue("hashedPassword");
      User.create.mockResolvedValue(user);
      jwt.sign.mockReturnValue("testToken");

      const req = {
        body: {
          gender: "male",
          firstname: "Test",
          lastname: "User",
          email: "mail@test.com",
          password: "Test123!",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await createUser(req, res);

      expect(User.create).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ accessToken: "testToken" });
    });

    it("should return 400 when body is missing", async () => {
      const req = {
        body: {
          gender: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Missing user data!",
          code: 400,
        },
      });
    });

    it("should return 409 when the user already exists", async () => {
      User.findOne.mockResolvedValue(user);

      const req = {
        body: {
          gender: "male",
          firstname: "Test",
          lastname: "User",
          email: "mail@test.com",
          password: "Test123!",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith({
        error: "User already exists!",
      });
    });

    it("should return 409 when the password is too short", async () => {
      User.findOne.mockResolvedValue(null);

      const req = {
        body: {
          gender: "male",
          firstname: "Test",
          lastname: "User",
          email: "mail@test.com",
          password: "Test",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith({
        error: "Password is too short!",
      });
    });

    it("should return 500 if an error occurs", async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockReturnValue("hashedPassword");
      User.create.mockRejectedValue(new Error("DB Error"));

      const req = {
        body: {
          gender: "male",
          firstname: "Test",
          lastname: "User",
          email: "mail@test.com",
          password: "Test123!",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error creating user!",
          code: 500,
        },
      });
    });
  });

  describe("updateUploaded", () => {
    it("should return 200 with the updated user", async () => {
      const mockUser = { ...user, uploadedRecipes: [], save: jest.fn() };
      User.findOne.mockResolvedValue(mockUser);

      const req = {
        body: {
          user,
          recipe,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateUploaded(req, res);

      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining(mockUser));
      expect(mockUser.uploadedRecipes).toContain(recipe);
      expect(mockUser.save).toHaveBeenCalled();
    });

    it("should return 400 if the user is missing", async () => {
      const req = {
        body: {
          recipe,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateUploaded(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Missing user!",
          code: 400,
        },
      });
    });

    it("should return 400 if the recipe is missing", async () => {
      const req = {
        body: {
          user,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateUploaded(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Missing recipe!",
          code: 400,
        },
      });
    });

    it("should return 500 if an error occurs", async () => {
      User.findOne.mockRejectedValue(new Error("DB Error"));
      const req = {
        body: {
          user,
          recipe,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateUploaded(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error updating uploaded recipes for user!",
          code: 500,
        },
      });
    });
  });

  describe("updateFavorites", () => {
    it("should return 200 with the updated user", async () => {
      const mockUser = { ...user, favoriteRecipes: [], save: jest.fn() };
      User.findOne.mockResolvedValue(mockUser);

      const req = {
        body: {
          user,
          recipe,
          favorite: true,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateFavorites(req, res);

      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining(mockUser));
      expect(mockUser.favoriteRecipes).toContain(recipe);
      expect(mockUser.save).toHaveBeenCalled();
    });

    it("should return 400 if the user is missing", async () => {
      const req = {
        body: {
          recipe,
          favorite: true,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateFavorites(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Missing user!",
          code: 400,
        },
      });
    });

    it("should return 400 if the recipe is missing", async () => {
      const req = {
        body: {
          user,
          favorite: true,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateFavorites(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Missing recipe!",
          code: 400,
        },
      });
    });

    it("should return 500 if an error occurs", async () => {
      User.findOne.mockRejectedValue(new Error("DB Error"));
      const req = {
        body: {
          user,
          recipe,
          favorite: false,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateFavorites(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: {
          message: "Error updating favorite recipes for user!",
          code: 500,
        },
      });
    });
  });

  describe("getUser", () => {
    it("should return 200 with the user", async () => {
      const req = {
        user: user,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(req.user);
    });
  });
});

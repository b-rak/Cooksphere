import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/auth";
import user from "../mocks/user";
import User from "../models/user";

jest.mock("../models/user.js");
jest.mock("jsonwebtoken");

describe("authMiddleware", () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      headers: { authorization: "Bearer 123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });
  it("should return 403 if no auth headers are provided", async () => {
    await authMiddleware({ headers: {} }, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Access token required!");
  });

  it("should return 401 if no user is authenticated", async () => {
    jwt.verify.mockReturnValue({ id: 1 });
    User.findOne = jest.fn(() => ({
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue(null),
      })),
    }));

    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Authentication required!");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 500 if an error occurs", async () => {
    User.findOne = jest.fn(() => ({
      populate: jest.fn(() => ({
        populate: jest.fn().mockRejectedValue(new Error("DB Error")),
      })),
    }));

    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      "Error checking authentication status"
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if the user is authenticated", async () => {
    jwt.verify.mockReturnValue({ id: 123 });
    User.findOne = jest.fn(() => ({
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue(user),
      })),
    }));

    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import Cookies from "js-cookie";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectRoute } from "../components/ProtectRoute.jsx";
import { Login } from "../components/loginpage/Login.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

jest.mock("../services/UserService.js", () => ({
  BASE_URL: () => "http://localhost:3000",
}));

describe("ProtectRoute Component", () => {
  function renderComponent() {
    render(
      <AuthContext.Provider
        value={{
          currentUser: {},
          setCurrentUser: jest.fn(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path={"/"}
              element={
                <ProtectRoute>
                  <h1>Protected Page</h1>
                </ProtectRoute>
              }
            />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }

  it("should forward to login without cookies", () => {
    renderComponent();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Login");
  });

  it("should forward to login without cookies", () => {
    jest.spyOn(Cookies, "get").mockReturnValue("mockedAccessToken");

    renderComponent();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Protected Page");
  });
});

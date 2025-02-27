import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RecipeDetailsPage } from "../../components/recipedetailspage/RecipeDetailsPage.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import recipe from "../mocks/recipe.js";
import user from "../mocks/user.js";

jest.mock("../../services/UserService.js", () => ({
  BASE_URL: () => "http://localhost:3000",
}));
jest.mock("../../services/ApiClient.js", () => {
  const recipe = { ...recipe };
  return {
    BASE_URL: () => "http://localhost:3000",
    getRecipe: async () => recipe,
  };
});

describe("RecipeDetailsPage Component", () => {
  function renderComponent(recipe = {}) {
    render(
      <AuthContext.Provider
        value={{
          currentUser: user,
          setCurrentUser: jest.fn(),
        }}
      >
        <MemoryRouter initialEntries={[`/recipe/${recipe._id}`]}>
          <Routes>
            <Route path={"/recipe/:recipeId"} element={<RecipeDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }

  it("should render the component", () => {
    renderComponent(recipe);
    waitFor(async () => {
      const heading = screen.getAllByRole("heading")[0];
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toEqual(recipe.name);
    });
  });

  it("should display loading message", async () => {
    renderComponent();
    const txtLoading = screen.getByText("Loading...");
    expect(txtLoading).toBeInTheDocument();
  });
});

import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RecipeList } from "../components/RecipeList.jsx";
import recipes from "./mocks/recipes.js";

describe("RecipeList Component", () => {
  function renderComponent() {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path={"/"}
            element={<RecipeList title="New Added Recipes" recipes={recipes} />}
          />
        </Routes>
      </MemoryRouter>
    );
  }

  it("should render the component", () => {
    renderComponent();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("New Added Recipes");

    const recipeList = screen.getByTestId("recipe-list");
    for (let i = 0; i < recipeList.children.length; i++) {
      const recipe = recipeList.children[i];
      expect(recipe.getAttribute("href")).toEqual(`/recipe/${recipes[i]._id}`);
      const imgRecipe = within(recipe).getByRole("img");
      expect(imgRecipe.getAttribute("src")).toEqual(recipes[i].image);
      const titleRecipe = within(recipe).getByTestId("recipe-title");
      expect(titleRecipe.textContent).toEqual(recipes[i].name);
    }
  });
});

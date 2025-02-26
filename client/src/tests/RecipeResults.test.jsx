import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RecipeResults } from "../components/RecipeResults.jsx";
import recipes from "./mocks/recipes.js";

describe("RecipeResults Component", () => {
  const message = "There are no recipes please add them.";
  function renderComponent(recipes = []) {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route
            path={"/profile"}
            element={<RecipeResults recipes={recipes} message={message} />}
          />
        </Routes>
      </MemoryRouter>
    );
  }

  it("should render the component", () => {
    renderComponent(recipes);
    const msgElement = screen.queryByTestId("message");
    expect(msgElement).toBeNull();
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

  it("should render the component without recipes", () => {
    renderComponent();
    const msgElement = screen.getByTestId("message");
    expect(msgElement).toBeInTheDocument();
    expect(msgElement.textContent).toEqual(message);
  });
});

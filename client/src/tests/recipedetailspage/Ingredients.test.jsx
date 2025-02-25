import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Ingredients } from "../../components/recipedetailspage/Ingredients.jsx";
import recipe from "../mocks/recipe.js";

describe("Ingredients Component", () => {
  function renderComponent() {
    render(
      <MemoryRouter initialEntries={[`/recipe/${recipe._id}`]}>
        <Routes>
          <Route
            path={"/recipe/:recipeId"}
            element={<Ingredients ingredients={recipe.ingredients} />}
          />
        </Routes>
      </MemoryRouter>
    );
  }

  it("should render the component", () => {
    renderComponent();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Ingredients");

    const listIngredients = screen.getByRole("list");
    for (let i = 0; i < listIngredients.children.length; i++) {
      const ingredient = listIngredients.children[i];
      const measure = ingredient.children[0].textContent;
      expect(measure).toEqual(recipe.ingredients[i].measure);
      const name = ingredient.children[1].textContent;
      expect(name).toEqual(recipe.ingredients[i].ingredient);
    }
  });
});

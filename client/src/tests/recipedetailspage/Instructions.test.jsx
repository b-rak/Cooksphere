import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Instructions } from "../../components/recipedetailspage/Instructions.jsx";
import recipe from "../mocks/recipe.js";

describe("Instructions Component", () => {
  function renderComponent() {
    render(
      <MemoryRouter initialEntries={[`/recipe/${recipe._id}`]}>
        <Routes>
          <Route
            path={"/recipe/:recipeId"}
            element={
              <Instructions instructions={Object.values(recipe.instructions)} />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  }

  it("should render the component", () => {
    renderComponent();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Instructions");

    const listInstructions = screen.getByRole("list");
    for (let i = 0; i < listInstructions.children.length; i++) {
      const instruction = listInstructions.children[i].textContent;
      expect(instruction).toEqual(
        `Step ${i + 1}${Object.values(recipe.instructions)[i]}`
      );
    }
  });
});

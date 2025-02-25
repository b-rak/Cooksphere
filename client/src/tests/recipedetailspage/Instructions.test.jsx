import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Instructions } from "../../components/recipedetailspage/Instructions.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import recipe from "../mocks/recipe.js";

describe("Instructions Component", () => {
  const setMockCurrentUser = jest.fn();

  function renderComponent() {
    render(
      <AuthContext.Provider
        value={{
          currentUser: {},
          setCurrentUser: setMockCurrentUser,
        }}
      >
        <MemoryRouter initialEntries={[`/recipe/${recipe._id}`]}>
          <Routes>
            <Route
              path={"/recipe/:recipeId"}
              element={<Instructions instructions={recipe.instructions} />}
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component", () => {
    renderComponent();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Instructions");

    const listInstructions = screen.getByRole("list");
    for (let i = 0; i < listInstructions.children.length; i++) {
      const instruction = listInstructions.children[i].textContent;
      expect(instruction).toEqual(`Step ${i + 1}${recipe.instructions[i]}`);
    }
  });
});

import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CategoryList } from "../components/CategoryList.jsx";
import categories from "./mocks/categories.js";

describe("CategoryList Component", () => {
  function renderComponent() {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path={"/"}
            element={
              <CategoryList title="Recipe Categories" listItems={categories} />
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
    expect(heading.textContent).toEqual("Recipe Categories");

    const categoryList = screen.getByTestId("category-list");
    for (let i = 0; i < categoryList.children.length; i++) {
      const category = categoryList.children[i];
      expect(category.getAttribute("href")).toEqual(
        `/recipes/category/${categories[i].name}`
      );
      const imgCategory = within(category).getByRole("img");
      expect(imgCategory.getAttribute("src")).toEqual(categories[i].image);
      const titleCategory = within(category).getByTestId("category-title");
      expect(titleCategory.textContent).toEqual(categories[i].name);
    }
  });
});

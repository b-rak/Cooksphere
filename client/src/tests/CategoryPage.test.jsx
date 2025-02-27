import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../components/CategoryPage.jsx";
import categories from "./mocks/categories.js";

jest.mock("../config/config.js", () => ({
  config: {
    CLOUDINARY_IMAGE_URL:
      "https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856",
  },
}));

jest.mock("../services/ApiClient.js", () => {
  const recipes = require("./mocks/recipes.js").default;
  return {
    BASE_URL: () => "http://localhost:3000",
    getRecipes: async (category) => recipes,
  };
});

const category = categories[0];
describe("Profile Component", () => {
  function renderComponent() {
    render(
      <MemoryRouter initialEntries={[`/recipes/category/${category.name}`]}>
        <Routes>
          <Route
            path={"/recipes/category/:category"}
            element={<CategoryPage />}
          />
        </Routes>
      </MemoryRouter>
    );
  }

  it("should render the component", async () => {
    renderComponent();
    await waitFor(() => {
      const heading = screen.getByTestId("category-name");
      expect(heading).toBeInTheDocument();
      const image = screen.getByTestId("category-image");
      expect(image).toBeInTheDocument();
      expect(image.style.backgroundImage).toContain(
        "https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856"
      );
    });
  });
});

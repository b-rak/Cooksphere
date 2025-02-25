import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Hero } from "../components/Hero.jsx";
import { SearchResultPage } from "../components/SearchResultPage.jsx";

jest.mock("../config/config.js", () => ({
  config: {
    CLOUDINARY_IMAGE_URL:
      "https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856",
  },
}));

jest.mock("../services/ApiClient.js", () => ({
  BASE_URL: () => "http://localhost:3000",
  searchRecipes: async () => [],
}));

describe("CategoryList Component", () => {
  function renderComponent() {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path={"/"} element={<Hero />} />
          <Route path="/search" element={<SearchResultPage />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it("should render the component", () => {
    renderComponent();

    const hero = screen.getByTestId("hero-container");
    expect(hero.style.backgroundImage).toContain(
      "https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856"
    );

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Find your next favorite dish!");

    const inputSearch = screen.getByRole("textbox");
    const buttonSearch = screen.getByRole("button");

    expect(inputSearch).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    expect(buttonSearch.textContent).toEqual("Search");
  });

  it("should forward to the search result page", async () => {
    renderComponent();
    const searchTerm = "Cake";
    const inputSearch = screen.getByRole("textbox");
    await userEvent.type(inputSearch, searchTerm);
    const buttonSearch = screen.getByRole("button");
    await userEvent.click(buttonSearch);

    const searchPageHeading = screen.getByTestId("search-heading");
    expect(searchPageHeading.textContent).toEqual(
      `Search results for "${searchTerm}"`
    );
  });
});

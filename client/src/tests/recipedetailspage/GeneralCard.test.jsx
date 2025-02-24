import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GeneralCard } from "../../components/recipedetailspage/GeneralCard.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { updateFavorites } from "../../services/ApiClient.js";
import recipe from "../mocks/recipe.js";
import user from "../mocks/user.js";

jest.mock("../../services/UserService.js", () => {
  const user = { ...user };

  return {
    BASE_URL: () => "http://localhost:3000",
    getUser: () => user,
  };
});

jest.mock("../../services/ApiClient.js", () => ({
  BASE_URL: () => "http://localhost:3000",
  updateFavorites: jest.fn(async (currentUser, recipe, newFavoriteStatus) => {
    if (!newFavoriteStatus) {
      currentUser.favoriteRecipes = currentUser.favoriteRecipes.filter(
        (favorite) => favorite._id !== recipe._id
      );
    } else {
      currentUser.favoriteRecipes.push(recipe);
    }
  }),
}));

describe("GeneralCard Component", () => {
  const setMockCurrentUser = jest.fn();

  function renderComponent(currentUser = {}) {
    render(
      <AuthContext.Provider
        value={{
          currentUser: currentUser,
          setCurrentUser: setMockCurrentUser,
        }}
      >
        <MemoryRouter initialEntries={[`/recipe/${recipe._id}`]}>
          <Routes>
            <Route
              path={"/recipe/:recipeId"}
              element={<GeneralCard recipe={recipe} />}
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
    expect(heading.textContent).toEqual(recipe.name);

    const imgRecipe = screen.getAllByRole("img")[0];
    expect(imgRecipe).toBeInTheDocument();
    expect(imgRecipe.getAttribute("src")).toEqual(recipe.image);

    const linkCategory = screen.getAllByRole("link")[0];
    expect(linkCategory).toBeInTheDocument();
    expect(linkCategory.textContent).toEqual(recipe.category);

    const cookingTime = screen.getByTestId("cookingtime").textContent;
    expect(cookingTime).toEqual("2h 3min");

    const prgNotLoggedIn = screen.getByRole("paragraph");
    expect(prgNotLoggedIn).toBeInTheDocument();
    expect(prgNotLoggedIn.textContent).toEqual(
      "Login to save recipes for later"
    );

    const btnFavorite = screen.getByRole("button");
    expect(btnFavorite).toBeInTheDocument();
    expect(btnFavorite).toBeDisabled();
  });

  it("should enable favorite button when logged in", () => {
    renderComponent(user);

    const prgNotLoggedIn = screen.queryByRole("paragraph");
    expect(prgNotLoggedIn).toBeNull();

    const btnFavorite = screen.getByRole("button");
    expect(btnFavorite).toBeInTheDocument();
    expect(btnFavorite).toBeEnabled();
  });

  it("should add to favorites", async () => {
    renderComponent(user);

    const btnFavorite = screen.getByRole("button");
    expect(btnFavorite.textContent).toEqual("Add to favorites");
    await userEvent.click(btnFavorite);
    expect(updateFavorites).toHaveBeenCalledWith(user, recipe, true);
    expect(user.favoriteRecipes.length).toEqual(1);
    expect(btnFavorite.textContent).toEqual("Remove from favorites");
    await userEvent.click(btnFavorite);
    expect(updateFavorites).toHaveBeenCalledWith(user, recipe, false);
    expect(user.favoriteRecipes.length).toEqual(0);
    expect(btnFavorite.textContent).toEqual("Add to favorites");
  });
});

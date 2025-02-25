import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Reviews } from "../../components/recipedetailspage/Reviews.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { rateAndReview } from "../../services/ApiClient.js";
import recipe from "../mocks/recipe.js";
import user from "../mocks/user.js";

jest.mock("../../services/ApiClient.js", () => {
  const recipe = require("../mocks/recipe.js").default;
  return {
    BASE_URL: () => "http://localhost:3000",
    rateAndReview: jest.fn(async (recipeId, newReview) => {
      const oldRating = recipe.rating;
      recipe.reviews.push(newReview);
      const newRating = parseFloat(
        ((oldRating + newReview.rating) / recipe.reviews.length).toFixed(2)
      );
      recipe.rating = newRating;
    }),
    refreshRecipe: jest.fn(),
  };
});

function formatDate(timestamp) {
  const date = timestamp.split("T")[0];
  return date.split("-").reverse().join(".");
}

const fixedTimestamp = "2025-02-24T12:00:00.000Z";
jest.spyOn(global, "Date").mockImplementation(() => ({
  toISOString: () => fixedTimestamp,
}));

describe("Reviews Component", () => {
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
              element={
                <Reviews reviews={recipe.reviews} refreshRecipe={jest.fn} />
              }
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
    expect(heading.textContent).toEqual("Reviews");

    const prgNotLoggedIn = screen.getByRole("paragraph");
    expect(prgNotLoggedIn).toBeInTheDocument();
    expect(prgNotLoggedIn.textContent).toEqual(
      "Please login before submitting a rating or review."
    );

    const listReviews = screen.getByTestId("review-list");
    for (let i = 0; i < listReviews.children.length; i++) {
      const review = listReviews.children[i];
      const author = review.children[0].children[0].textContent;
      const timestamp = review.children[0].children[1].textContent;
      expect(author).toEqual(recipe.reviews[i].author);
      expect(timestamp).toEqual(formatDate(recipe.reviews[i].timestamp));
      const message = review.children[1].textContent;
      expect(message).toEqual(recipe.reviews[i].message);
    }
  });

  it("should render correctly for rating and review when logged in", async () => {
    renderComponent(user);

    const btnPost = screen.getByRole("button");
    expect(btnPost).toBeInTheDocument();
    expect(btnPost.textContent).toEqual("Post review");
    expect(btnPost).toBeDisabled();

    const areaReview = screen.getByRole("textbox");
    await userEvent.type(areaReview, "This is a test review");

    const secondStarInput = screen.getAllByRole("radio")[1];
    await userEvent.click(secondStarInput);
    expect(btnPost).toBeEnabled();
  });

  it("should render correctly for only rating when logged in", async () => {
    renderComponent(user);

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    const btnPost = screen.getByRole("button");
    expect(btnPost).toBeInTheDocument();
    expect(btnPost.textContent).toEqual("Rate without review");
    expect(btnPost).toBeDisabled();

    const thirdStarInput = screen.getAllByRole("radio")[3];
    await userEvent.click(thirdStarInput);
    expect(btnPost).toBeEnabled();
  });

  it("should post a review", async () => {
    renderComponent(user);

    const areaReview = screen.getByRole("textbox");
    await userEvent.type(areaReview, "This is a test review");
    const secondStarInput = screen.getAllByRole("radio")[1];
    await userEvent.click(secondStarInput);
    const btnPost = screen.getByRole("button");

    const newReview = {
      author: user.firstname + " " + user.lastname,
      message: "This is a test review",
      rating: 2,
      timestamp: fixedTimestamp,
    };
    await userEvent.click(btnPost);
    expect(rateAndReview).toHaveBeenCalledWith(String(recipe._id), newReview);

    const listReviews = screen.getByTestId("review-list");
    for (let i = 0; i < listReviews.children.length; i++) {
      const review = listReviews.children[i];
      const author = review.children[0].children[0].textContent;
      const timestamp = review.children[0].children[1].textContent;
      expect(author).toEqual(recipe.reviews[i].author);
      expect(timestamp).toEqual(formatDate(recipe.reviews[i].timestamp));
      const message = review.children[1].textContent;
      expect(message).toEqual(recipe.reviews[i].message);
    }
  });
});

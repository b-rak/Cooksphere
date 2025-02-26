import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Profile } from "../components/Profile.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import userWithRecipes from "./mocks/userWithRecipes.js";

jest.mock("../services/UserService.js", () => ({
  BASE_URL: () => "http://localhost:3000",
}));
jest.mock("../services/ApiClient.js", () => ({
  BASE_URL: () => "http://localhost:3000",
}));

describe("Profile Component", () => {
  function renderComponent() {
    render(
      <AuthContext.Provider
        value={{
          currentUser: userWithRecipes,
          setCurrentUser: jest.fn(),
        }}
      >
        <MemoryRouter initialEntries={["/profile"]}>
          <Routes>
            <Route path={"/profile"} element={<Profile />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }

  it("should render the component", () => {
    renderComponent();
    const headings = screen.getAllByRole("heading");
    expect(headings[0]).toBeInTheDocument();
    expect(headings[0].textContent).toEqual("My Profile");
    expect(headings[1]).toBeInTheDocument();
    expect(headings[1].textContent).toEqual("Favorite Recipes");
    expect(headings[2]).toBeInTheDocument();
    expect(headings[2].textContent).toEqual("Uploaded Recipes");
    const userCard = screen.getByTestId("user-card");
    expect(
      within(userCard).getByText(
        `${userWithRecipes.firstname} ${userWithRecipes.lastname}`
      )
    ).toBeInTheDocument();
    const btnUpload = within(userCard).getByRole("button");
    expect(btnUpload).toBeInTheDocument();
    expect(btnUpload.textContent).toEqual("Upload Recipe");
  });

  it("should open and close the upload popup", async () => {
    renderComponent();
    const button = screen.getByRole("button");
    await userEvent.click(button);
    const formUpload = screen.getByTestId("upload-form");
    // popup opens
    const heading = within(formUpload).getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Upload Recipe");
    // clicking the popup content should not close the dialog
    await userEvent.click(formUpload);
    // clicking outside the popup content should close the dialog
    const popup = screen.getByTestId("popup");
    await userEvent.click(popup);
    expect(heading).not.toBeInTheDocument();
  });
});

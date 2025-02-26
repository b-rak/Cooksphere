import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

jest.mock("../services/UserService.js", () => ({
  BASE_URL: () => "http://localhost:3000",
}));
jest.mock("../services/ApiClient.js", () => ({
  BASE_URL: () => "http://localhost:3000",
}));

describe("Navbar Component", () => {
  function renderComponent(currentUser = {}) {
    render(
      <AuthContext.Provider
        value={{
          currentUser,
          setCurrentUser: jest.fn(),
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path={"/"} element={<Navbar />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }

  it("should render the component", () => {
    renderComponent();
    const links = screen.getAllByRole("link");
    expect(links.length).toEqual(2);
    expect(links[0].getAttribute("href")).toEqual("/");
    expect(within(links[0]).getByRole("img").getAttribute("src")).toContain(
      "logo"
    );
    expect(links[1].getAttribute("href")).toEqual("/login");
    expect(links[1].textContent.toLowerCase()).toEqual("login");
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Cooksphere");
  });
});

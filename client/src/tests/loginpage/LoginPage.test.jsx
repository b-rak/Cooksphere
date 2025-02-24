import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../components/loginpage/LoginPage.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";

jest.mock("../../services/UserService.js", () => ({
  BASE_URL: () => "http://localhost:3000",
}));

describe("Login Component", () => {
  const mockCurrentUser = {};
  const setMockCurrentUser = jest.fn();

  function renderComponent() {
    render(
      <AuthContext.Provider
        value={{
          currentUser: mockCurrentUser,
          setCurrentUser: setMockCurrentUser,
        }}
      >
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should switch between Login and Register components", async () => {
    renderComponent();

    const btnToRegister = screen.getAllByRole("button")[1];
    await userEvent.click(btnToRegister);

    const headingRegister = screen.getByRole("heading");
    expect(headingRegister).toBeInTheDocument();
    expect(headingRegister.textContent).toEqual("Register");

    const btnToLogin = screen.getAllByRole("button")[1];
    await userEvent.click(btnToLogin);

    const headingLogin = screen.getByRole("heading");
    expect(headingLogin).toBeInTheDocument();
    expect(headingLogin.textContent).toEqual("Login");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Login } from "../../components/loginpage/Login.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";

jest.mock("../../services/UserService.js", () => ({
  BASE_URL: () => "http://localhost:3000",
  login: () => {},
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
            <Route path="/login" element={<Login />} />
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
    expect(heading.textContent).toEqual("Login");

    const email = screen.getByLabelText("E-Mail:");
    expect(email).toBeInTheDocument();

    const password = screen.getByLabelText("Password:");
    expect(password).toBeInTheDocument();

    const btnLogin = screen.getAllByRole("button")[0];
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin.textContent).toEqual("Login");

    const paragraph = screen.getByRole("paragraph");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.textContent).toEqual("No account yet? Register here!");
  });

  it("should display error message", async () => {
    renderComponent();
    const btnLogin = screen.getAllByRole("button")[0];
    await userEvent.click(btnLogin);
    const msgError = screen.getByText("Please fill in the form!");
    expect(msgError).toBeInTheDocument();

    const email = screen.getByLabelText("E-Mail:");
    await userEvent.type(email, "not_registered@test.com");
    const password = screen.getByLabelText("Password:");
    await userEvent.type(password, "WrongPW123");
    await userEvent.click(btnLogin);

    const msgInvalid = screen.getByText("Invalid credentials");
    expect(msgInvalid).toBeInTheDocument();
  });
});

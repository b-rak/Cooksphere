import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Register } from "../../components/loginpage/Register.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";

jest.mock("../../services/UserService.js", () => ({
  BASE_URL: () => "http://localhost:3000",
  register: () => {},
}));

describe("Register Component", () => {
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
            <Route path="/login" element={<Register />} />
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
    expect(heading.textContent).toEqual("Register");

    const firstname = screen.getByLabelText("Firstname:");
    expect(firstname).toBeInTheDocument();

    const lastname = screen.getByLabelText("Lastname:");
    expect(lastname).toBeInTheDocument();

    const email = screen.getByLabelText("E-Mail:");
    expect(email).toBeInTheDocument();

    const password = screen.getByLabelText("Password:");
    expect(password).toBeInTheDocument();

    const btnLogin = screen.getAllByRole("button")[0];
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin.textContent).toEqual("Register");

    const paragraph = screen.getByRole("paragraph");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.textContent).toEqual(
      "Already have an account? Login here!"
    );
  });

  it("should display error message", async () => {
    renderComponent();
    const btnRegister = screen.getAllByRole("button")[0];
    await userEvent.click(btnRegister);
    const msgError = screen.getByText("Please enter a firstname and lastname!");
    expect(msgError).toBeInTheDocument();

    const firstname = screen.getByLabelText("Firstname:");
    await userEvent.type(firstname, "Test");
    const lastname = screen.getByLabelText("Lastname:");
    await userEvent.type(lastname, "User");
    await userEvent.click(btnRegister);
    const msgNoEmail = screen.getByText(
      'Please enter a email in the format "test@mail.com"'
    );
    expect(msgNoEmail).toBeInTheDocument();

    const email = screen.getByLabelText("E-Mail:");
    await userEvent.type(email, "not_registered@test.com");
    const password = screen.getByLabelText("Password:");
    await userEvent.type(password, "short");
    await userEvent.click(btnRegister);
    const msgPWShort = screen.getByText(
      "Please enter a password with minimum length 8"
    );
    expect(msgPWShort).toBeInTheDocument();

    await userEvent.clear(password);
    await userEvent.type(password, "Test123!");
    const passwordRepeat = screen.getByLabelText("Repeat Password:");
    await userEvent.type(passwordRepeat, "Test123?");
    await userEvent.click(btnRegister);
    const msgPWNotMatching = screen.getByText(
      "The two entered passwords are not the same!"
    );
    expect(msgPWNotMatching).toBeInTheDocument();

    await userEvent.clear(passwordRepeat);
    await userEvent.type(passwordRepeat, "Test123!");
    await userEvent.click(btnRegister);
    const msgErrorRegister = screen.getByText("Error registering new account");
    expect(msgErrorRegister).toBeInTheDocument();
  });
});

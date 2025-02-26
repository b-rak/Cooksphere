import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/loginpage/Login.jsx";
import { Profile } from "../components/Profile.jsx";
import { ProfileIcon } from "../components/ProfileIcon.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import user from "./mocks/user.js";

jest.mock("../services/UserService.js", () => ({
  BASE_URL: () => "http://localhost:3000",
}));
jest.mock("../services/ApiClient.js", () => ({
  BASE_URL: () => "http://localhost:3000",
}));

describe("ProfileIcon Component", () => {
  function renderComponent(initialUser = {}) {
    const TestWrapper = () => {
      const [currentUser, setCurrentUser] = React.useState(initialUser);

      return (
        <AuthContext.Provider
          value={{
            currentUser,
            setCurrentUser,
          }}
        >
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path={"/"} element={<ProfileIcon />} />
              <Route path={"/profile"} element={<Profile />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );
    };

    render(<TestWrapper />);
  }

  it("should render the component (not logged in)", () => {
    renderComponent();
    const linkLogin = screen.getByRole("link");
    expect(linkLogin.getAttribute("href")).toEqual("/login");
    expect(linkLogin.textContent.toLowerCase()).toEqual("login");
  });

  it("should forward to the login page", async () => {
    renderComponent();
    const linkLogin = screen.getByRole("link");
    await userEvent.click(linkLogin);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("Login");
  });

  it("should render the component (logged in)", async () => {
    renderComponent(user);
    const imgProfileicon = screen.getByRole("img");
    expect(imgProfileicon).toBeInTheDocument();
    expect(imgProfileicon.getAttribute("src")).toContain(user.image);

    await userEvent.click(imgProfileicon);
    const username = screen.getByText(`${user.firstname} ${user.lastname}`);
    expect(username).toBeInTheDocument();
    const linkProfile = screen.getByText("My Profile");
    expect(linkProfile).toBeInTheDocument();
    const btnLogout = screen.getByText("Logout");
    expect(btnLogout).toBeInTheDocument();
  });

  it("should forward to the profile page", async () => {
    renderComponent(user);
    const imgProfileicon = screen.getByRole("img");
    await userEvent.click(imgProfileicon);
    const linkProfile = screen.getByText("My Profile");
    await userEvent.click(linkProfile);
    const heading = screen.queryAllByRole("heading")[0];
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual("My Profile");
  });

  it("should logout the user", async () => {
    renderComponent(user);
    const imgProfileicon = screen.getByRole("img");
    await userEvent.click(imgProfileicon);
    const btnLogout = screen.getByText("Logout");
    await userEvent.click(btnLogout);

    await waitFor(() => {
      const linkLogin = screen.getByRole("link");
      expect(linkLogin.getAttribute("href")).toEqual("/login");
      expect(linkLogin.textContent.toLowerCase()).toEqual("login");
    });
  });

  it("should close the menu after outside click", async () => {
    renderComponent(user);
    const imgProfileicon = screen.getByRole("img");
    await userEvent.click(imgProfileicon);
    const btnLogout = screen.getByText("Logout");
    expect(btnLogout).toBeInTheDocument();

    await userEvent.click(document.body);
    expect(btnLogout).not.toBeInTheDocument();
  });
});

import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { getUser, login } from "../../services/UserService";
import { Input } from "../common/Input";

export function Login({ setShowLogin }) {
  const initialState = {
    email: "",
    password: "",
  };
  const [formState, setFormState] = useState(initialState);
  const { setCurrentUser } = useAuthContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (formState.email === "" || formState.password === "") {
      setError("Please fill in the form!");
      return;
    }
    try {
      const { accessToken } = await login(formState);
      if (!accessToken) setError("Invalid credentials");

      Cookies.set("accessToken", accessToken);
      const user = await getUser();
      setCurrentUser(user);
      setError("");
      setFormState(initialState);
      await navigate("/");
    } catch (e) {
      setError("Invalid credentials");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center py-12 px-4 bg-brown rounded-md w-fit mx-auto shadow-md"
      >
        <h2 className="text-2xl font-bold font-fira text-white">Login</h2>
        {error ? <p className="text-error">{error}</p> : ""}
        <Input
          id="email"
          name="email"
          value={formState.email}
          text="E-Mail:"
          handleChange={handleChange}
        />
        <Input
          id="password"
          name="password"
          value={formState.password}
          text="Password:"
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="bg-orange text-white hover:bg-deeporange mt-4 rounded-md px-2 py-1 uppercase text-sm cursor-pointer w-full"
        >
          Login
        </button>
        <p className="mt-4">
          No account yet? Register{" "}
          <button
            className="hover:underline cursor-pointer font-mediu text-white"
            onClick={() => setShowLogin(false)}
          >
            here!
          </button>
        </p>
      </form>
    </>
  );
}

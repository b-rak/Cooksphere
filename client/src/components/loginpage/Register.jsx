import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { Input } from "../common/Input";

export function Register({ setShowLogin }) {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordRepeat: "",
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
    console.log("FORM", formState);
    return;
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
        <h2 className="text-2xl font-bold font-fira text-white">Register</h2>
        {error ? <p className="text-error">{error}</p> : ""}

        <Input
          id="firstname"
          name="firstname"
          value={formState.firstname}
          text="Firstname:"
          handleChange={handleChange}
        />
        <Input
          id="lastname"
          name="lastname"
          value={formState.lastname}
          text="Lastname:"
          handleChange={handleChange}
        />
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
        <Input
          id="passwordRepeat"
          name="passwordRepeat"
          value={formState.passwordRepeat}
          text="Repeat Password:"
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="bg-orange text-white hover:bg-deeporange mt-4 rounded-md px-2 py-1 uppercase text-sm cursor-pointer w-full"
        >
          Login
        </button>
        <p className="mt-4">
          Already have an account? Login{" "}
          <button
            className="hover:underline cursor-pointer font-mediu text-white"
            onClick={() => setShowLogin(true)}
          >
            here!
          </button>
        </p>
      </form>
    </>
  );
}

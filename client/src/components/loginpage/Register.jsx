import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { getUser, register } from "../../services/UserService";
import { Input } from "../common/Input";

export function Register({ setShowLogin }) {
  const initialState = {
    gender: "male",
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

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateForm() {
    if (formState.firstname.trim() === "" || formState.lastname.trim() === "") {
      setError("Please enter a firstname and lastname!");
      return false;
    } else if (!EMAIL_REGEX.test(formState.email)) {
      setError('Please enter a email in the format "test@mail.com"');
      return false;
    } else if (formState.password.trim().length < 8) {
      setError("Please enter a password with minimum length 8");
      return false;
    } else if (formState.password.trim() !== formState.passwordRepeat.trim()) {
      setError("The two entered passwords are not the same!");
      return false;
    }
    setError("");
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      const { accessToken } = await register(formState);
      if (!accessToken) setError("Error registering new account");

      Cookies.set("accessToken", accessToken);
      const user = await getUser();
      setCurrentUser(user);
      setError("");
      setFormState(initialState);
      await navigate("/");
    } catch (e) {
      setError("Error registering new account");
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

        <div className="flex w-full">
          <div
            className={
              "text-center basis-1/2 py-2 cursor-pointer rounded-l-md " +
              (formState.gender === "male"
                ? "bg-softyellow"
                : "border border-softyellow text-lightbeige")
            }
            onClick={() =>
              setFormState((prev) => ({ ...prev, gender: "male" }))
            }
          >
            Male
          </div>
          <div
            className={
              "text-center basis-1/2 py-2 cursor-pointer rounded-r-md " +
              (formState.gender !== "male"
                ? "bg-softyellow"
                : "border border-softyellow text-lightbeige")
            }
            onClick={() =>
              setFormState((prev) => ({ ...prev, gender: "female" }))
            }
          >
            Female
          </div>
        </div>
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
          Register
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

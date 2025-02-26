import React from "react";
import { Link } from "react-router";
import { ProfileIcon } from "./ProfileIcon";

export function Navbar() {
  return (
    <>
      <header className="flex justify-between items-center px-8 py-2 shadow-[0_0_0.25rem_#808080]">
        <Link to="/">
          <img src="/logo.png" alt="Cooksphere Logo" className="w-16" />
        </Link>
        <h1 className="flex-grow text-center font-fira font-black italic text-4xl">
          Cooksphere
        </h1>
        <ProfileIcon />
      </header>
    </>
  );
}

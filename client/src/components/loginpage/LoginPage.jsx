import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="pt-12">
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Register setShowLogin={setShowLogin} />
      )}
    </div>
  );
}

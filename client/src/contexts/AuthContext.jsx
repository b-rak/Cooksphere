import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

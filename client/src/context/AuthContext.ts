import { User } from "../types";
import { createContext } from "react";

export const AuthContex = createContext<User | null>({
    id: '',
    firstname: 'Guest',
    lastname: 'User',
    email: '',
    image: 'default',
    favoriteRecipes: [],
    uploadedRecipes: []
});
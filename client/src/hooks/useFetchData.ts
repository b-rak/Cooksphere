import { useEffect, useState } from "react"
import { Category, Recipe, User } from "../types"
import { getCategories, getLatestRecipes, login } from "../ApiClient";


export const useFetchData = () => {
    const [categories, setCaregories] =useState<Category[]>([]);
    const [latestRecipes, setLatestRecipes] = useState<Recipe[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    
    getCategories()
    .then(setCaregories)
    .catch((err) => console.error("Error fetching categories:", err));
  
  
  
    getLatestRecipes()
    .then(setLatestRecipes)
    .catch((err) => console.error('Error fetching recipes:', err));
 
  

  
    login({email: 'zappe.thomson@test.com', password: 'Test123!'})
      .then(setCurrentUser)
      .catch((err) => console.error('Error logging:', err));
  }, []);

  return { categories, latestRecipes, currentUser}

}
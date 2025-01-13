import { createContext, useEffect, useState } from 'react';
import './App.css';
import { getCategories, getLatestRecipes, login } from './ApiClient';
import { CategoryList } from './components/CategoryList';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { CategoryPage } from './components/CategoryPage';
import { RecipeDetailsPage } from './components/RecipeDetailsPage';
import { RecipeList } from './components/RecipeList';
import { Routes, Route } from "react-router";
import { Profile } from './components/Profile';

export const AuthContext = createContext(null);
function App() {
  const [categories, setCategories] = useState([])
  const [latest, setLatest] = useState([])

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCategories()
    .then(data => setCategories(data))
    .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    getLatestRecipes()
    .then(data => setLatest(data))
    .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    login({email: 'zappe.thomson@test.com', password: 'Test123!'})
      .then(data => setCurrentUser(data))
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className='bg-orange-200 pl-8 py-4'>
                <CategoryList title={'Recipe Categories'} listItems={categories}/>
                <RecipeList title={'New Added Recipes'} recipes={latest}/>
              </div>
            </>
          }/>
          <Route path="/recipe/:recipeId" element={<RecipeDetailsPage />}/>
          <Route path="/recipes/category/:category" element={<CategoryPage />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App;

import { createContext, useEffect, useState } from 'react';
import './App.css';
import { getCategories, getLatestRecipes, login } from './ApiClient';
import { CategoryList } from './components/CategoryList';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { CategoryPage } from './components/CategoryPage';
import { RecipeDetailsPage } from './components/recipedetailspage/RecipeDetailsPage';
import { RecipeList } from './components/RecipeList';
import { Routes, Route } from "react-router";
import { Profile } from './components/Profile';
import { SearchResultPage } from './components/SearchResultPage';




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
        <main className='bg-lightbeige'>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div className='mx-8 py-4'>
                  <CategoryList title={'Recipe Categories'} listItems={categories}/>
                  <hr className=' my-4 text-center h-[0.0625rem] bg-deepbrown border-0'/>
                  <RecipeList title={'New Added Recipes'} recipes={latest}/>
                </div>
              </>
            }/>
            <Route path="/recipe/:recipeId" element={<RecipeDetailsPage />}/>
            <Route path="/recipes/category/:category" element={<CategoryPage />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/search" element={<SearchResultPage />}/>
          </Routes>
        </main>
      </AuthContext.Provider>
    </>
  )
}

export default App;

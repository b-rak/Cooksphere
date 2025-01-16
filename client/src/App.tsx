import { AuthContex } from './context/AuthContext';
import { useFetchData } from './hooks/useFetchData';

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

// import { User } from './types';

//!Authentication context. This will remain here for now but could be moved to a separate file if the project scales.
// export const AuthContext = createContext(null);


function App() {
  const { categories, latestRecipes, currentUser } = useFetchData();

  useEffect(() => {
    console.log(`
    🚀 Starting the Cooksphere app! 
    ✨ Shoutout to Murak for the incredible work on this project! 
    🎓 The only reason I'm making changes is because CodeWorks demands it.
    If it were up to me, I'd leave this masterpiece untouched. 🙌
    Let's call this "forced improvement." 😅
    `);
  }, []);

  //! States to manage categories, latest recipes, and the current user.
  //! This logic will be refactored into a custom hook (`useFetchData`).
  
  // const [categories, setCategories] = useState([])
  // const [latest, setLatest] = useState([])
  // const [currentUser, setCurrentUser] = useState({});
  
  //*| The logic for fetching data (categories, recipes, and user login) |
  //*| via useEffect will be moved into a custom hook named useFetchData.|
  //! useEffect to fetch categories.
  // useEffect(() => {
  //   getCategories()
  //   .then(data => setCategories(data))
  //   .catch(e => console.log(e));
  // }, []);
  
  //! useEffect to fetch the latest recipes.
  // useEffect(() => {
  //   getLatestRecipes()
  //   .then(data => setLatest(data))
  //   .catch(e => console.log(e));
  // }, []);
  
  //! useEffect to log in using test credentials. 
  // useEffect(() => {
  //   login({email: 'zappe.thomson@test.com', password: 'Test123!'})
  //     .then(data => setCurrentUser(data))
  //     .catch(e => console.log(e));
  // }, []);


  //*| All routes inside <Routes> will be moved to a separate component |
  //*| called AppRoutes to make App.jsx more focused on managing global |
  //*| state and context.                                               |

  return (
    <>
    {/* Context provider to share use data across the app */}
      <AuthContex.Provider value={currentUser}>
      
      {/* Navbar component will remain unchaged */}
        <Navbar />
        <main className='bg-lightbeige'>
          
        {/* Route definitions > will be move to separate file for clarity (AppRoutes) */}
          <Routes>
            <Route path="/" element={
              <>

              {/* Hero component will remains unchanged */}
                <Hero />
                <div className='mx-8 py-4'>
                  
                {/* In CategoryList and RecipeList, the data logic will be centralized in the custom hook */}
                  <CategoryList title={'Recipe Categories'} listItems={categories}/>
                  <hr className=' my-4 text-center h-[0.0625rem] bg-deepbrown border-0'/>
                  <RecipeList title={'New Added Recipes'} recipes={latestRecipes}/>
                </div>
              </>
            }/>
            <Route path="/recipe/:recipeId" element={<RecipeDetailsPage />}/>
            <Route path="/recipes/category/:category" element={<CategoryPage />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/search" element={<SearchResultPage />}/>
          </Routes>
        </main>
      </AuthContex.Provider>
    </>
  )
}

export default App;

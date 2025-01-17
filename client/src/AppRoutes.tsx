import React from "react";
import { AppRoutesProps } from "./types";
import { Route, Routes } from "react-router";
import { Hero } from "./components/Hero";
import { CategoryList } from "./components/CategoryList";
import { RecipeList } from "./components/RecipeList";
import { CategoryPage } from "./components/CategoryPage";
import { RecipeDetailsPage } from "./components/recipedetailspage/RecipeDetailsPage";
import { Profile } from "./components/Profile";
import { SearchResultPage } from "./components/SearchResultPage";


export const AppRoutes: React.FC<AppRoutesProps> = ({ categories, latestRecipes}) => {
    return (
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
            <Route path="/recipe/:recipeId" element={<RecipeDetailsPage />} />
            <Route path="/recipes/category/:category" element={<CategoryPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchResultPage />} />
        </Routes>
    );
};
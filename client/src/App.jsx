import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { CategoryList } from "./components/CategoryList";
import { CategoryPage } from "./components/CategoryPage";
import { Hero } from "./components/Hero";
import { LoginPage } from "./components/loginpage/LoginPage";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { ProtectRoute } from "./components/ProtectRoute";
import { RecipeDetailsPage } from "./components/recipedetailspage/RecipeDetailsPage";
import { RecipeList } from "./components/RecipeList";
import { SearchResultPage } from "./components/SearchResultPage";
import { useAuthContext } from "./contexts/AuthContext";
import { getCategories, getLatestRecipes } from "./services/ApiClient";
import { getUser } from "./services/UserService";

function App() {
  const [categories, setCategories] = useState([]);
  const [latest, setLatest] = useState([]);
  const { currentUser, setCurrentUser } = useAuthContext();

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    getLatestRecipes()
      .then((data) => setLatest(data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      getUser()
        .then((user) => setCurrentUser(user))
        .catch((e) => console.log(e));
    }
  }, []);
  return (
    <>
      <Navbar />
      <main className="bg-lightbeige min-h-[calc(100vh-5rem)]">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div className="mx-8 py-4">
                  <CategoryList
                    title={"Recipe Categories"}
                    listItems={categories}
                  />
                  <hr className=" my-4 text-center h-[0.0625rem] bg-deepbrown border-0" />
                  <RecipeList title={"New Added Recipes"} recipes={latest} />
                </div>
              </>
            }
          />
          <Route path="/recipe/:recipeId" element={<RecipeDetailsPage />} />
          <Route
            path="/recipes/category/:category"
            element={<CategoryPage />}
          />
          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          <Route path="/search" element={<SearchResultPage />} />
          <Route
            path="/login"
            element={
              Object.keys(currentUser).length ? (
                <Navigate to="/" />
              ) : (
                <LoginPage />
              )
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;

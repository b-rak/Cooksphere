import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { updateFavorites } from "../../services/ApiClient";
import { getUser } from "../../services/UserService";
import { Rating } from "../Rating";

export function GeneralCard({ recipe }) {
  const { currentUser, setCurrentUser } = useAuthContext();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (currentUser.favoriteRecipes) {
      const isFavorite = currentUser.favoriteRecipes.some(
        (favoriteRecipe) => favoriteRecipe._id === recipe._id
      );
      setFavorite(isFavorite);
    }
  }, [currentUser]);

  function formatCookingTime(time) {
    const minutes = time % 60;
    const hours = (time - minutes) / 60;

    return (
      (hours > 0 ? hours + "h " : "") + (minutes > 0 ? minutes + "min" : "")
    );
  }

  async function handleFavorite() {
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);
    await updateFavorites(currentUser, recipe, newFavoriteStatus);
    const user = await getUser();
    setCurrentUser(user);
  }

  return (
    <>
      <div className="col-span-full h-[22rem]">
        <div className="h-full flex items-center relative">
          <img
            src={recipe.image}
            alt="recipe image"
            className="h-[22rem] max-w-[22rem] rounded-xl shadow_2 absolute"
          />
          <div className="bg-brown py-4 pr-8 pl-16 rounded-xl flex flex-col justify-between h-52 shadow_2 w-full ml-[20rem]">
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-white">{recipe.name}</h1>
                <Link to={"/recipes/category/" + recipe.category}>
                  <span className="px-2 py-1 h-fit rounded-md bg-softyellow text-deepbrown font-poppins uppercase text-sm">
                    {recipe.category}
                  </span>
                </Link>
              </div>
              <span className="text-white" data-testid="cookingtime">
                {formatCookingTime(recipe.cookingTimeInMinutes)}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <Rating rating={recipe.rating} />
              <div className="flex flex-col items-end gap-2">
                {!Object.keys(currentUser).length && (
                  <p className="text-white text-sm">
                    Login to save recipes for later
                  </p>
                )}
                <button
                  className="flex bg-orange text-white hover:bg-deeporange disabled:bg-deeporange items-center gap-2 rounded-md px-2 py-1 uppercase text-sm w-fit"
                  onClick={handleFavorite}
                  disabled={!Object.keys(currentUser).length}
                >
                  <img
                    src={favorite ? "/heartfull.svg" : "/heart.svg"}
                    alt=""
                    className="w-6 h-6"
                  />
                  {favorite ? "Remove from favorites" : "Add to favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

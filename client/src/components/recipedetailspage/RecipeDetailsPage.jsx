import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getRecipe } from "../../services/ApiClient";
import { GeneralCard } from "./GeneralCard";
import { Ingredients } from "./Ingredients";
import { Instructions } from "./Instructions";
import { Reviews } from "./Reviews";

export function RecipeDetailsPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = () => {
    getRecipe(recipeId)
      .then((data) => setRecipe(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="py-16 px-24 w-full bg-lightbeige grid grid-rows-[repeat(5,auto)] md:grid-rows-[repeat(3,auto)] md:grid-cols-[22rem_1fr] gap-4">
        <GeneralCard recipe={recipe} />
        <Ingredients ingredients={recipe.ingredients} />
        <Instructions instructions={recipe.instructions} />
        <Reviews
          reviews={recipe.reviews.filter(
            (review) => review.message.trim() !== ""
          )}
          refreshRecipe={fetchRecipe}
        />
      </div>
    </>
  );
}

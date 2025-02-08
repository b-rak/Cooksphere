import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getRecipe } from "../../ApiClient";
import { GeneralCard } from "./GeneralCard";
import { Ingredients } from "./Ingredients";
import { Instructions } from "./Instructions";
import { Reviews } from "./Reviews";
import { Recipe } from "../../types";

export function RecipeDetailsPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    getRecipe(recipeId)
      .then((data) => setRecipe(data))
      .catch((e) => console.log(e));
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
        />
      </div>
    </>
  );
}

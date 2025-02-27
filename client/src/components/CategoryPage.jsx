import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { config } from "../config/config";
import { getRecipes } from "../services/ApiClient";
import { filterRecipes } from "../utils/filterRecipes";
import { categories } from "../utils/imagePaths";
import { sortRecipes } from "../utils/sortRecipes";
import { Filter } from "./Filter";
import { RecipeResults } from "./RecipeResults";
import { SortSelect } from "./SortSelect";

export function CategoryPage() {
  const { category } = useParams();
  const url = `${config.CLOUDINARY_IMAGE_URL}/${categories[category]}.jpg`;

  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ tags: [], time: [], ratings: "all" });
  const [sorting, setSorting] = useState("");

  useEffect(() => {
    getRecipes(category)
      .then((data) => {
        setRecipes(data);
        setFiltered(data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      const filteredRecipes = filterRecipes(recipes, filter);
      const sortedRecipes = sortRecipes(filteredRecipes, sorting);
      setFiltered(sortedRecipes);
    }
  }, [filter, recipes, sorting]);

  return (
    <>
      <div className="flex pl-4">
        <Filter
          recipes={recipes}
          updateFilter={(newFilterState) => setFilter(newFilterState)}
        />

        <div className="w-3/4">
          <div className="h-80 w-full relative">
            <div
              className="h-80 bg-cover bg-[50%_45%] bg-no-repeat opacity-75"
              style={{ backgroundImage: `url(${url})` }}
              data-testid="category-image"
            ></div>
            <h3
              className="absolute top-12 left-4 text-5xl font-bold font-fira"
              data-testid="category-name"
            >
              {category + " Recipes"}
            </h3>
          </div>
          <div className="px-2 py-4">
            <SortSelect sorting={sorting} setSorting={setSorting} />
            <RecipeResults
              recipes={filtered}
              message="No results matching the filter selection."
            />
          </div>
        </div>
      </div>
    </>
  );
}

import { useSearchParams } from "react-router"
import { RecipeResults } from "./RecipeResults";
import { useEffect, useState } from "react";
import { searchRecipes } from "../ApiClient";
import { Filter } from "./Filter";
import { filterRecipes } from "../utils/filterRecipes";
import { sortRecipes } from '../utils/sortRecipes';
import { SortSelect } from "./SortSelect";

export function SearchResultPage () {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState({tags: [], time: [], ratings: 'all'});
  const [filtered, setFiltered] = useState([]);
  const [sorting, setSorting] = useState('');

  useEffect(() => {
    searchRecipes(searchParams.get('q'))
      .then(data => {
        setResults(data)
        setFiltered(data)
      })
      .catch(e => console.log(e));
  }, [searchParams]);

  useEffect(() => {
    if (results.length > 0) {
      const filteredRecipes = filterRecipes(results, filter);
      const sortedRecipes = sortRecipes(filteredRecipes, sorting)
      setFiltered(sortedRecipes);
    }
  }, [filter, results, sorting]);

  return (
    <>
      <div className="flex">
        <Filter recipes={results} updateFilter={(filter) => setFilter(filter)}/>
        <div className="w-full">
          <h2 className="text-2xl font-bold">Search results</h2>
          <SortSelect setSorting={setSorting} />
          <RecipeResults recipes={filtered}/>
        </div>
      </div>
    </>
  )
}
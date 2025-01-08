import { useEffect, useState } from 'react';
import './App.css';
import { getRecipes, getCategories } from './ApiClient';

function App() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes()
    .then(data => setRecipes(data))
    .catch(e => console.log(e));
  }, []);

  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
    .then(data => setCategories(data))
    .catch(e => console.log(e));
  }, []);

  return (
    <>
      <div>
        {recipes.map(recipe => <h3 key={recipe._id}>{recipe.name}</h3>)}
      </div>
      <div>
        {categories.map(category => <h3 key={category._id}>{category.name}</h3>)}
      </div>
    </>
  )
}

export default App

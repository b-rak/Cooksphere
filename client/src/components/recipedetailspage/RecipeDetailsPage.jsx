import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getRecipe } from '../../ApiClient';
import { GeneralCard } from './GeneralCard';
import { Ingredients } from './Ingredients';
import { Instructions } from './Instructions';

export function RecipeDetailsPage () {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    getRecipe(recipeId)
      .then(data => setRecipe(data))
      .catch(e => console.log(e));
  }, [recipeId]);

  if (!recipe) {
    return (<div>Loading...</div>)
  }

  return (
    <>
      <div className='py-16 px-20 w-full bg-[#FFF8E7] grid grid-rows-[repeat(5,auto)] md:grid-rows-[repeat(3,auto)] md:grid-cols-[22rem_1fr]'>
        <img src={recipe.image} alt="recipe image" className='h-[22rem] w-[22rem] border border-solid border-blue-600 rounded-xl'/>
        <GeneralCard recipe={recipe} />
        <Ingredients ingredients={recipe.ingredients} />
        <Instructions instructions={recipe.instructions} />
        <div className='p-4 border border-solid border-amber-300 rounded-xl md:col-span-2'>
          <h2 className='text-xl font-semibold font-roboto'>Reviews</h2>
        </div>
      </div>
    </>
  );
};
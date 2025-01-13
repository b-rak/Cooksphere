import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getRecipe } from '../ApiClient';
import { Rating } from './Rating';

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

  function formatCookingTime (time) {
    const minutes = time%60;
    const hours = (time-minutes)/60;

    return (hours > 0 ? hours + 'h ' : '') + (minutes > 0 ? minutes + 'min' : '');
  }

  return (
    <>
      <div className='py-16 px-20 w-full bg-[#FFF8E7] grid grid-rows-[repeat(5,auto)] md:grid-rows-[repeat(3,auto)] md:grid-cols-[22rem_1fr]'>
        <img src={recipe.image} alt="recipe image" className='h-[22rem] w-[22rem] border border-solid border-blue-600 rounded-xl'/>
        <div className='bg-[#c2c2c2] p-4 border border-solid rounded-xl flex flex-col justify-between h-40'>
          <div>
            <div className='flex items-center gap-4'>
              <h1 className='text-3xl font-bold font-roboto'>{recipe.name}</h1>
              <Link to={'/recipes/category/' + recipe.category}>
                <span className='px-2 py-1 h-fit rounded-md bg-[#FFC857] text-[#4A2C2A] font-poppins uppercase text-sm'>{recipe.category}</span>
              </Link>
            </div>
            <span>{formatCookingTime(recipe.cookingTimeInMinutes)}</span>
          </div>
          <div className='flex justify-between'>
            <Rating rating={3.5}/>
            <button className='flex bg-[#FF6F3C] text-white hover:bg-[#D95427] items-center gap-2 rounded-md px-2 py-1 uppercase text-sm'>
              <img src="/heart.svg" alt="" className='w-6 h-6'/>
              Add to favorites
            </button>
          </div>
        </div>
        <div className='p-4 bg-[#c2c2c2] rounded-xl'>
          <h2 className='text-xl font-semibold font-roboto flex items-center gap-2'>Ingredients
            <img src="/list.svg" alt="list-icon" className='w-6 h-6'/>
          </h2>
          <ul className='pl-4'>
            {recipe.ingredients.map((ingredient, index) => {
              return <li key={index} className={(index>0 ? 'border-t border-t-solid' : '') + ' flex gap-2'}>
                      <div className='w-[40%] text-right'>{ingredient.measure}</div>
                      <div className='w-[60%]'>{ingredient.ingredient}</div>
                    </li>
            })}
          </ul>
        </div>
        <div className='p-4 bg-[#c2c2c2] rounded-xl'>
        <h2 className='text-xl font-semibold font-roboto flex items-center gap-2'>Instructions
          <img src="/spoon.svg" alt="spoon-icon" className='w-5 h-5'/>
        </h2>
          <ol className='p-4 flex flex-col gap-4'>
            {recipe.instructions.map((instruction, index) => (
              <>
                <li key={index} className='p-2 rounded-md bg-[#FFF8E7]'>
                  <div className='h-fit w-[3.75rem] text-center rounded-md bg-[#FFC857] text-[#4A2C2A] font-poppins uppercase text-sm'>{'Step ' + (index+1)}</div>
                  {instruction}
                </li>
              </>
            ))}
          </ol>
        </div>
        <div className='p-4 border border-solid border-amber-300 rounded-xl md:col-span-2'>
          <h2 className='text-xl font-semibold font-roboto'>Reviews</h2>
        </div>
      </div>
    </>
  );
};
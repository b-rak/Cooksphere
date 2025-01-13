import { Rating } from '../Rating';
import { Link } from 'react-router';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../App';
import {updateFavorites} from '../../ApiClient';

export function GeneralCard ({recipe}) {
  const currentUser = useContext(AuthContext);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (currentUser.favoriteRecipes) {
      console.log(favorite)
      console.log(currentUser)
      const isFavorite = currentUser.favoriteRecipes.some(
        favoriteRecipe => favoriteRecipe._id === recipe._id
      );
      setFavorite(isFavorite);
    }
  }, [currentUser]);

  function formatCookingTime (time) {
    const minutes = time%60;
    const hours = (time-minutes)/60;

    return (hours > 0 ? hours + 'h ' : '') + (minutes > 0 ? minutes + 'min' : '');
  }

  async function handleFavorite () {
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);
    await updateFavorites(currentUser, recipe, newFavoriteStatus);
  }

  return (
    <>
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
            <button className='flex bg-[#FF6F3C] text-white hover:bg-[#D95427] items-center gap-2 rounded-md px-2 py-1 uppercase text-sm' onClick={handleFavorite}>
              <img src={favorite ? '/heartfull.svg' : '/heart.svg'} alt="" className='w-6 h-6'/>
              {favorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </div>
        </div>
    </>
  )
}
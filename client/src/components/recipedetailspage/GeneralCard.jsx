import { Rating } from '../Rating';
import { Link } from 'react-router';
import { useContext, useEffect, useState } from "react";
import { AuthContex } from '../../context/AuthContext';
import {updateFavorites} from '../../ApiClient';

export function GeneralCard ({recipe}) {

  const currentUser = useContext(AuthContex);
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
      <div className='col-span-full h-[22rem]'>
        <div className='h-full flex items-center relative'>
          <img src={recipe.image} alt="recipe image" className='h-[22rem] max-w-[22rem] rounded-xl shadow_2 absolute'/>
          <div className='bg-brown py-4 pr-8 pl-16 rounded-xl flex flex-col justify-between h-52 shadow_2 w-full ml-[20rem]'>
            <div>
              <div className='flex items-center gap-4'>
                <h1 className='text-3xl font-bold text-white'>{recipe.name}</h1>
                <Link to={'/recipes/category/' + recipe.category}>
                  <span className='px-2 py-1 h-fit rounded-md bg-softyellow text-deepbrown font-poppins uppercase text-sm'>{recipe.category}</span>
                </Link>
              </div>
              <span className='text-white'>{formatCookingTime(recipe.cookingTimeInMinutes)}</span>
            </div>
            <div className='flex justify-between'>
              <Rating rating={recipe.rating}/>
              <button className='flex bg-orange text-white hover:bg-deeporange items-center gap-2 rounded-md px-2 py-1 uppercase text-sm' onClick={handleFavorite}>
                <img src={favorite ? '/heartfull.svg' : '/heart.svg'} alt="" className='w-6 h-6'/>
                {favorite ? 'Remove from favorites' : 'Add to favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

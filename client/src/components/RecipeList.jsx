import { Link } from "react-router";

export function RecipeList ({title, recipes}) {
  return (
    <>
      <h2 className='text-2xl font-bold mb-2'>{title}</h2>
        <div className='flex gap-4 overflow-x-scroll scrollbar-none'>
          {recipes.map(recipe => (
            <>
              <Link to={'/recipe/' + recipe._id} key={recipe._id}>
                <div key={recipe._id} className='min-w-56 cursor-pointer'>
                  <img src={recipe.image} alt={recipe.name} className='w-56 h-56 rounded-lg'/>
                  <span className='text-lg w-56'>{recipe.name}</span>
                </div>
              </Link>
            </>)
          )}
        </div>
    </>
  );
};
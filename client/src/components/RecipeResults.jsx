import { Link } from "react-router";

export function RecipeResults ({recipes, message}) {
  return (
    <>
        <div
          className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(14rem,_1fr))] px-8 py-4 bg-brown rounded-lg"
        >
          {recipes.length > 0 ?
            recipes.map((recipe) => (
            <Link to={'/recipe/' + recipe._id} key={recipe._id} className="cursor-pointer h-full">
              <div className="w-56 bg-lightbeige rounded-lg shadow_2 p-1 h-full">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-56 rounded-lg"
                />
                <span className="text-lg block px-2">{recipe.name}</span>
              </div>
            </Link>
          ))
          : <span className="text-white text-center">
            {message}
          </span>
          }
    </div>
    </>
  );
};
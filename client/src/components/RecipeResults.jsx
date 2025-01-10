import { Link } from "react-router";

export function RecipeResults ({recipes}) {
  return (
    <>
        <div
          className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(14rem,_1fr))] justify-start"
        >
          {recipes.map((recipe) => (
            <Link to={'/recipe/' + recipe._id} key={recipe._id} className="cursor-pointer">
              <div className="w-56">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-56 rounded-lg"
                />
                <span className="text-lg block">{recipe.name}</span>
              </div>
            </Link>
          ))}
    </div>
    </>
  );
};
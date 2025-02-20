import { Link } from "react-router";

export function RecipeList({ title, recipes }) {
  return (
    <>
      <div className="px-8 py-4 bg-brown rounded-lg">
        <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
        <div className="flex gap-4 overflow-x-scroll scrollbar-none">
          {recipes.map((recipe) => (
            <Link to={"/recipe/" + recipe._id} key={recipe._id}>
              <div className="min-w-56 cursor-pointer bg-lightbeige rounded-lg shadow_2 p-1 h-full">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-56 h-56 rounded-lg"
                />
                <div className="text-lg px-2">{recipe.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

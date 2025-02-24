import React from "react";

export function Ingredients({ ingredients }) {
  return (
    <>
      <div className="p-4 bg-brown rounded-xl h-fit shadow_2">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white px-4">
          Ingredients
          <img src="/list.svg" alt="list-icon" className="w-6 h-6" />
        </h2>
        <ul className="m-4 bg-lightbeige rounded-md">
          {ingredients.map((ingredient, index) => {
            return (
              <li
                key={index}
                className={
                  (index > 0 ? "border-t border-t-solid" : "") +
                  " flex gap-2 p-2"
                }
              >
                <div className="w-[40%] text-right">{ingredient.measure}</div>
                <div className="w-[60%]">{ingredient.ingredient}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

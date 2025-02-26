import React from "react";
import { Input } from "./common/Input";

export function Ingredient({ number, values, handleChange }) {
  return (
    <>
      <div className="flex gap-4">
        <Input
          id={"ingredient-" + number}
          name={"ingredient-" + number}
          value={values["ingredient" + number]}
          text={"Ingredient " + number + ":"}
          handleChange={handleChange}
        />
        <Input
          id={"measure-" + number}
          name={"measure-" + number}
          value={values["measure" + number]}
          text={"Measure " + number + ":"}
          handleChange={handleChange}
        />
      </div>
    </>
  );
}

import { sortRecipes } from "../../utils/sortRecipes.js";
import recipes from "../mocks/recipes.js";

describe("sortRecipes", () => {
  it("should sort recipes by A-Z", () => {
    const sorted = sortRecipes(recipes, "A-Z");
    expect(sorted.length).toEqual(recipes.length);
    expect(sorted).toEqual([recipes[0], recipes[1], recipes[2]]);
  });

  it("should sort recipes by Z-A", () => {
    const sorted = sortRecipes(recipes, "Z-A");
    expect(sorted.length).toEqual(recipes.length);
    expect(sorted).toEqual([recipes[2], recipes[1], recipes[0]]);
  });

  it("should sort recipes by best rating", () => {
    const sorted = sortRecipes(recipes, "Best");
    expect(sorted.length).toEqual(recipes.length);
    expect(sorted).toEqual([recipes[1], recipes[0], recipes[2]]);
  });

  it("should sort recipes by worst rating", () => {
    const sorted = sortRecipes(recipes, "Worst");
    expect(sorted.length).toEqual(recipes.length);
    expect(sorted).toEqual([recipes[2], recipes[0], recipes[1]]);
  });

  it("should return recipes when sortBy is invalid", () => {
    const sorted = sortRecipes(recipes, "invalidOption");
    expect(sorted.length).toEqual(recipes.length);
    expect(sorted).toEqual(recipes);
  });
});

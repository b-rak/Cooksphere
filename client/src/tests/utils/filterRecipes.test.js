import { filterRecipes } from "../../utils/filterRecipes.js";
import recipes from "../mocks/recipes.js";

describe("filterRecipes", () => {
  it("should filter recipes by rating", () => {
    const filtered = filterRecipes(recipes, { tags: [], time: [], ratings: 4 });
    expect(filtered.length).toEqual(2);
    expect(filtered[0].name).toEqual(recipes[0].name);
    expect(filtered[1].name).toEqual(recipes[1].name);
  });

  it("should filter recipes by tags", async () => {
    const filtered = filterRecipes(recipes, {
      tags: ["tag4"],
      time: [],
      ratings: "all",
    });
    expect(filtered.length).toEqual(1);
    expect(filtered[0].name).toEqual(recipes[2].name);
  });

  it("should filter recipes by duration", async () => {
    let filtered = filterRecipes(recipes, {
      tags: [],
      time: "quick",
      ratings: "all",
    });
    expect(filtered.length).toEqual(1);
    expect(filtered[0].name).toEqual(recipes[2].name);
    filtered = filterRecipes(recipes, {
      tags: [],
      time: "moderate",
      ratings: "all",
    });
    expect(filtered.length).toEqual(1);
    expect(filtered[0].name).toEqual(recipes[1].name);
    filtered = filterRecipes(recipes, {
      tags: [],
      time: "intensive",
      ratings: "all",
    });
    expect(filtered.length).toEqual(1);
    expect(filtered[0].name).toEqual(recipes[0].name);
  });
});

export function getTags (recipes) {
  const tags = new Set();
  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      tags.add(tag);
    });
  });
  return tags;
}
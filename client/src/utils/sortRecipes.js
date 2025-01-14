export function sortRecipes (recipes, sortBy) {
  if (sortBy === 'A-Z') {
    return [...recipes].sort((a, b) => a.name>b.name ? 1 : -1);
  } else if (sortBy === 'Z-A') {
    return [...recipes].sort((a, b) => a.name<b.name ? 1 : -1);
  } else if (sortBy.includes('Best')) {
    return [...recipes].sort((a, b) => a.rating<b.rating);
  } else if (sortBy.includes('Worst')) {
    return [...recipes].sort((a, b) => a.rating>b.rating);
  }
  return recipes;
}
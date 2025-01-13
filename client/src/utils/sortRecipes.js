export function sortRecipes (recipes, sortBy) {
  if (sortBy === 'A-Z') {
    return [...recipes].sort((a, b) => a.name>b.name ? 1 : -1);
  } else if (sortBy === 'Z-A') {
    return [...recipes].sort((a, b) => a.name<b.name ? 1 : -1);
  } else if (sortBy.includes('Best')) {

  } else if (sortBy.includes('Worst')) {

  }
  return recipes;
}
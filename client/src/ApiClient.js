const BASE_URL = 'http://localhost:3000';

async function makeServerRequest (endpoint, options) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error}`);
  }
}

const getRecipes = async (category) => {
  try {
    return await makeServerRequest(`recipes/category/${category}`);
  } catch (e) {
    throw new Error(e);
  }
};

const getCategories = async () => {
  try {
    return await makeServerRequest('categories');
  } catch (e) {
    throw new Error(e);
  }
};

const getLatestRecipes = async () => {
  try {
    return await makeServerRequest('recipes/latest');
  } catch (e) {
    throw new Error(e);
  }
};

const uploadRecipe = async (recipeData) => {
  try {
    return await makeServerRequest('recipe', {
      method: 'POST',
      body: JSON.stringify(recipeData),
      headers: {'Content-Type': 'application/json'}
    });
  } catch (e) {
    throw new Error(e);
  }
};

export {getRecipes, getCategories, getLatestRecipes, uploadRecipe};
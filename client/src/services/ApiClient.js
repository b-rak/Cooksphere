const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
const CLOUDINARY_UPLOAD_URL =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_URL ||
  "https://api.cloudinary.com/v1_1/drm5qsq0p/image/upload";

async function makeServerRequest(endpoint, options) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error("Error fetching data");
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

const getRecipe = async (recipeId) => {
  try {
    return await makeServerRequest(`recipes/${recipeId}`);
  } catch (e) {
    throw new Error(e);
  }
};

const getCategories = async () => {
  try {
    return await makeServerRequest("categories");
  } catch (e) {
    throw new Error(e);
  }
};

const getLatestRecipes = async () => {
  try {
    return await makeServerRequest("recipes/latest");
  } catch (e) {
    throw new Error(e);
  }
};

const uploadRecipe = async (recipeData) => {
  try {
    return await makeServerRequest("recipes", {
      method: "POST",
      body: JSON.stringify(recipeData),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    throw new Error(e);
  }
};

const uploadImage = async (formData) => {
  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error uploading image");
    }
    return await response.json();
  } catch (e) {
    throw new Error(e);
  }
};

const updateUploaded = async (user, recipe) => {
  try {
    return await makeServerRequest("user/uploaded", {
      method: "PUT",
      body: JSON.stringify({ user, recipe }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    throw new Error(e);
  }
};

const updateFavorites = async (user, recipe, favorite) => {
  try {
    return await makeServerRequest("user/favorites", {
      method: "PUT",
      body: JSON.stringify({ user, recipe, favorite }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    throw new Error(e);
  }
};

const searchRecipes = async (searchinput) => {
  try {
    return await makeServerRequest(`recipes?q=${searchinput}`);
  } catch (e) {
    throw new Error(e);
  }
};

const rateAndReview = async (recipeId, reviewObj) => {
  try {
    return await makeServerRequest(`recipes/${recipeId}`, {
      method: "PUT",
      body: JSON.stringify(reviewObj),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    throw new Error(e);
  }
};

export {
  getCategories,
  getLatestRecipes,
  getRecipe,
  getRecipes,
  rateAndReview,
  searchRecipes,
  updateFavorites,
  updateUploaded,
  uploadImage,
  uploadRecipe,
};

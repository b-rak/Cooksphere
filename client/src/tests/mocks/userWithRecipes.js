const recipe = {
  _id: 126,
  name: "Test Recipe 4",
  category: "Vegan",
  instructions: ["Cut veggies", "Fry veggies", "Cook rice"],
  image: "imageurl_vegan",
  tags: ["tag1", "tag2", "tag3"],
  ingredients: [
    { ingredient: "ing1", measure: "2 tbs" },
    { ingredient: "ing2", measure: "100g" },
    { ingredient: "ing3", measure: "2" },
  ],
  cookingTimeInMinutes: 45,
  rating: 4,
  reviews: [],
};

export default {
  _id: "123",
  firstname: "Mock",
  lastname: "User",
  image: "woman",
  email: "mock@test.com",
  password: "$2b$10$9VmDqsY2P6Dw9sqp1cl/l.3Nh4ZlVaMqdWCZgpL0wZY8KPi6gtzE.",
  favoriteRecipes: [recipe],
  uploadedRecipes: [recipe],
  createdAt: "2025-02-21T10:56:49.365Z",
  updatedAt: "2025-02-21T10:56:49.365Z",
  __v: 0,
};

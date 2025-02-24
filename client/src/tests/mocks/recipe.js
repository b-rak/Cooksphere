export default {
  _id: 123,
  name: "Test Recipe",
  category: "Dessert",
  instructions: ["Step 1: Do step 1", "Step 2: Do step 2", "Step 3: Do step 3"],
  image: "imageurl",
  tags: ["tag1", "tag2", "tag3"],
  ingredients: [
    { ingredient: "ing1", measure: "2 tbs" },
    { ingredient: "ing2", measure: "100g" },
  ],
  cookingTimeInMinutes: 123,
  rating: 4,
  reviews: [
    {
      author: "Test Author",
      message: "Great recipe!",
      rating: 4,
      timestamp: "2025-02-23T13:14:23.292+00:00",
    },
  ],
};

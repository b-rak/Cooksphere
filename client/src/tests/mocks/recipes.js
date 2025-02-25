export default [
  {
    _id: 123,
    name: "Test Recipe",
    category: "Dessert",
    instructions: [
      "Step 1: Do step 1",
      "Step 2: Do step 2",
      "Step 3: Do step 3",
    ],
    image: "imageurl_dessert",
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
  },
  {
    _id: 124,
    name: "Test Recipe 2",
    category: "Vegetarian",
    instructions: ["Cut veggies", "Fry veggies", "Cook rice"],
    image: "imageurl_veggie",
    tags: ["tag1", "tag2", "tag3"],
    ingredients: [
      { ingredient: "ing1", measure: "2 tbs" },
      { ingredient: "ing2", measure: "100g" },
      { ingredient: "ing3", measure: "2" },
    ],
    cookingTimeInMinutes: 75,
    rating: 5,
    reviews: [],
  },
  {
    _id: 125,
    name: "Test Recipe 3",
    category: "Breakfast",
    instructions: ["Boil water", "Heat milk"],
    image: "imageurl_breakfast",
    tags: ["tag1", "tag2", "tag3"],
    ingredients: [
      { ingredient: "ing1", measure: "2" },
      { ingredient: "ing2", measure: "100ml" },
    ],
    cookingTimeInMinutes: 30,
    rating: 0,
    reviews: [],
  },
];

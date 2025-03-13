import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    // TODO area: str  (needed? maybe for search)
    instructions: { type: [String], required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
    ingredients: {
      type: [{ ingredient: String, measure: String }],
      required: true,
    },
    cookingTimeInMinutes: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: {
      type: [
        { author: String, message: String, rating: Number, timestamp: Date },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

recipeSchema.index({ name: "text", category: "text", tags: "text" });
const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;

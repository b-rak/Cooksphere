import mongoose from './index.js';

const recipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  // TODO area: str  (needed? maybe for search)
  instructions: {type: [String], required: true},
  image: {type: String, required: true},
  tags: {type: [String], required: true},
  ingredients: {type: [{ingrName: String, measure: String}], required: true},
  rating: {type: Number, default: 0},
  reviews: {type: [String], default: []},
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
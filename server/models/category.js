import mongoose from './index.js';

const categorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  image: {type: String, required: true},
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
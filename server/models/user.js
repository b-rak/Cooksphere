import mongoose from './index.js';

const userSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  image: {type: String, required: true, default: 'man'},
  email: {type: String, required: true},
  password: {type: String, required: true},
  favoriteRecipes: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }], default: []},
  uploadedRecipes: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }], default: []},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
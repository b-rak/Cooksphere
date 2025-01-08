'use strict';
import Category from './../models/category.js';

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    return res.status(500).send({error: {message: 'Error getting categories!', code: 500}});
  }
};

export {getAllCategories};
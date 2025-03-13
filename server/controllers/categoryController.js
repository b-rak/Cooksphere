"use strict";
import Category from "./../models/category.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: { message: "Error getting categories!", code: 500 } });
  }
};

export { getAllCategories };

'use strict';
import User from './../models/user.js';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(401).send({error: {message: 'Missing credentials!', code: 401}});
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: 'Wrong credentials' });
    }

    if (bcrypt.compareSync(password, user.password)) {
      return res.send(user);
    } else {
      return res.status(401).send({ error: 'Wrong credentials' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({error: {message: 'Error getting user!', code: 500}});
  }
};

const updateUploaded = async (req, res) => {
  try {
    const {user, recipe} = req.body;
    console.log("USER", user)
    console.log("RECIPE", recipe)
    if (!user) {
      return res.status(400).send({error: {message: 'Missing user!', code: 400}});
    } else if (!recipe) {
      return res.status(400).send({error: {message: 'Missing recipe!', code: 400}});
    }

    const userDB = await User.findOne({email: user.email});
    userDB.uploadedRecipes.push(recipe);
    await userDB.save();
  } catch (e) {
    console.log(e);
    return res.status(500).send({error: {message: 'Error updated uploaded recipes for user!', code: 500}});
  }
};

export { login, updateUploaded };
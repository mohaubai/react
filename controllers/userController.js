const { User, Product } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      role: 'user',
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Invalid login credentials.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  console.log('User:', req.user);
  res.send(req.user);
};

// Get products list
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

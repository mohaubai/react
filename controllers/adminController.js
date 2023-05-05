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
      role: 'admin',
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

// Add product
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Edit product
exports.editProduct = async (req, res) => {
    try {
      const product = await Product.findOne({
        where: { id: req.params.productId, userId: req.user.id },
      });
  
      if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
      }
  
      await product.update(req.body);
      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  };

// Get all products
exports.getProducts = async (req, res) => {
  try {
    console.log('getProducts called'); // Add this line
    const products = await Product.findAll({ where: { userId: req.user.id } });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};


  
  // Delete product
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findOne({
        where: { id: req.params.productId, userId: req.user.id },
      });
  
      if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
      }
  
      await product.destroy();
      res.send({ message: 'Product deleted.' });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
   

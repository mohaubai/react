const { Product, User } = require('../models');

// Get products list
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add product to cart (you'll need to create a Cart model and associate it with users and products)
exports.addToCart = async (req, res) => {
  // Your implementation here
};

// Get user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

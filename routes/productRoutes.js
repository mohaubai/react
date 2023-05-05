// const express = require('express');
// const router = express.Router();
// const { Product } = require('../models');

// // Add a route to fetch all products.
// router.get('/products', async (req, res) => {
//   // ... existing code ...
// });

// // Add a route to fetch a single product by ID.
// router.get('/products/:productId', async (req, res) => {
//   // ... existing code ...
// });

// // Add a route to update a single product by ID.
// router.put('/products/:productId', async (req, res) => {
//   try {
//     const product = await Product.findOne({
//       where: {
//         id: req.params.productId,
//       },
//     });

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Update the product with the request body
//     const updatedProduct = await product.update(req.body);

//     // Return the updated product as a JSON object
//     res.json(updatedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.get('/:productId', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.productId);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product' });
//   }
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// Fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Fetch a single product by ID
router.get('/products/:productId', async (req, res) => {
  console.log('Request URL:', req.originalUrl);
  try {
    const product = await Product.findByPk(req.params.productId);
    console.log('Fetched product:', product);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});


// Create a new product
router.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update a single product by ID
router.put('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product with the request body
    const updatedProduct = await product.update(req.body);

    // Return the updated product as a JSON object
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a single product by ID
router.delete('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;


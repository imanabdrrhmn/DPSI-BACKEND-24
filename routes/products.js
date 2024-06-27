const express = require('express');
const router = express.Router();
const { Product } = require('../models/index'); 
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint to add a new product
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { productName, supplierID, categoryID, unit, price } = req.body;
    const newProduct = await Product.create({ productName, supplierID, categoryID, unit, price });
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// Endpoint to fetch all products
router.get('/', authenticate, async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Endpoint to fetch a product by ID
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint to update a product by ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const { productName, supplierID, categoryID, unit, price } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (product) {
      product.productName = productName;
      product.supplierID = supplierID;
      product.categoryID = categoryID;
      product.unit = unit;
      product.price = price;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint to delete a product by ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

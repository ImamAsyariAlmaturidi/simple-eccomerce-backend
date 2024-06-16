const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

router.get('/products', productController.getProduct);
router.post('/products', productController.createProduct);
router.get('/products/:id', productController.getProductById);
router.delete('/products/:id', productController.deleteProductById);
router.post('/products/:id', productController.updateProductById);
module.exports = router;
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Add a new product
router.post('/addproduct', productController.addProduct);

// Get product by organization, site, and user IDs
router.post('/getproduct', productController.getProduct);

// Get all the product
router.get('/getallproduct', productController.getAllProducts);

// we are using this link in the sopstep.js file to get the user is insted of calling the /addproduct
router.get('/get-userid-by-sopid/:sopid', productController.getUserBySopId);


module.exports = router;

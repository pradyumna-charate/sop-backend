const axios = require('axios');
const Product = require('../models/Product');

// Add a new product
const addProduct = async (req, res) => {
  const productData = req.body;

  try {
    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      statusCode: 500,
      statusMessage: 'Failed to add product'
    });
  }
};

// Get product by organization, site, and user IDs
const getProduct = async (req, res) => {
  const { organizationId, siteId, userId } = req.body;

  try {
    const product = await Product.findOne({
      organizationId,
      siteId,
      userId,
    });

    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: 'Product not found'
      });
    }

    const response = {
      statusCode: 200,
      statusMessage: 'Success',
      data: {
        organizationId: product.organizationId,
        siteId: product.siteId,
        userId: product.userId,
        productName: product.productName.map(p => ({
          name: p.name,
          variants: p.variants.map(v => ({
            name: v.name,
            sops: v.sops
          }))
        }))
      }
    };

    console.log('Product Response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      statusCode: 500,
      statusMessage: 'Internal server error'
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // const products = await Product.find().populate("sops");
    const products = await Product.find().populate("productName.variants.sops");

    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      statusCode: 500,
      statusMessage: 'Failed to fetch products'
    });
  }
};

const getUserBySopId = async (req, res) => {
  try {
    const sopid = req.params.sopid;

    // Find the product that contains the given SOP ID
    const product = await Product.findOne({
      "productName.variants.sops": sopid
    });

    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: 'Product not found for the given SOP ID'
      });
    }

    // Extract organizationId, siteId, and userId from the product
    const { organizationId, siteId, userId } = product;

    res.json({
      organizationId,
      siteId,
      userId,
      sopid
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      statusCode: 500,
      statusMessage: 'Internal server error'
    });
  }
};


module.exports = {
  addProduct,
  getProduct,
  getAllProducts,
  getUserBySopId
};

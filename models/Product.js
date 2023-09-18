const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  organizationId: String,
  siteId: String,
  userId: String,
  productName: [{
    name: String,
    variants: [{
      name: String,
      sops: [{ type: mongoose.Schema.ObjectId, ref: "SopModel" }]
    }]
  }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

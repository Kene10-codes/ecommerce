/* Initialize the mongoose database
 * Initialize the schema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDesc: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

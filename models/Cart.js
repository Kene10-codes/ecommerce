/* Initialize the mongoose database
 * Initialize the schema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
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
    require: true,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

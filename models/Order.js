/* Initialize the mongoose database
 * Initialize the schema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  order: {
    type: Array,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

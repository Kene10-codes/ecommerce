/* Initialize the mongoose database
 * Initialize the schema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// order itmes schmea
const orderItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
});

// Order schema
const orderSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  orders: [orderItemSchema],
  totalQuantity: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered"],
    default: "pending",
  },
  paymentMethod: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

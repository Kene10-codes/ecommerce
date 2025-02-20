const Customer = require("../../models/Customer");
const { orderValidator } = require("../../validator/order/order-validator");
const Cart = require("../../models/Cart");

// Order upload
const addToCart = async (req, res) => {
  try {
    const { error } = orderValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find customer
    const customer = await Customer.findById({ _id: req.user.id });

    // Create order
    const order = Cart.create({
      customerId: customer._id,
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      quantity: req.body.quantity,
      price: req.body.price,
    });

    // Return order
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
  }
};

// Delete order
const deleteCart = async (req, res) => {
  try {
    const order = await Cart.findByIdAndDelete({ _id: req.params.id });
    if (!order) return res.status(400).send("No order with the ID found");

    res.status(200).send("Order successfully deleted");
  } catch (error) {
    console.error(error);
  }
};

// Update Order
const updateCart = async (req, res) => {
  try {
    const updatedOrder = await Cart.findByIdAndUpdate(
      { _id: req.params.id },
      {
        productName: req.body.productName,
        productDesc: req.body.productDesc,
        price: req.body.price,
      },
      { new: true }
    );

    // Return updated Order
    res.status(200).send("Order updated");
  } catch (error) {
    console.error(error);
  }
};

// Get order
const getCart = async (req, res) => {
  try {
    const order = await Cart.findById({ _id: req.params.id });
    if (!order) return res.status(400).send("No order found");

    // Return order
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
  }
};

// Export order controllers
module.exports = { addToCart, updateCart, deleteCart, getCart,};

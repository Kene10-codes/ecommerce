const Customer = require("../../models/Customer");
const Order = require("../../models/Order");
const { orderValidator } = require("../../validator/order/order-validator");

// Order upload
const addOrder = async (req, res) => {
  try {
    const { error } = orderValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find customer
    const customer = await Customer.findById({ _id: req.user.id });

    // Create order
    const order = Order.create({
      customerId: customer._id,
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      price: req.body.price,
    });

    // Return order
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete({ _id: req.params.id });
    if (!order) return res.status(400).send("No order with the ID found");

    res.status(200).send("Order successfully deleted");
  } catch (error) {
    console.error(error);
  }
};

// Update Order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
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
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.id });
    if (!order) return res.status(400).send("No order found");

    // Return order
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
  }
};

// Export order controllers
module.exports = { addOrder, deleteOrder, updateOrder, getOrder };

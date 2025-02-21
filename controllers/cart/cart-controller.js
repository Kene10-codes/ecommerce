const Customer = require("../../models/Customer");

const Cart = require("../../models/Cart");
const { orderValidator } = require("../../validator/order/order-validator");

// Order upload
const addToCart = async (req, res) => {
  try {
    const { price, quantity } = req.body;
    const { error } = orderValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find customer
    const customer = await Customer.findById({ _id: req.user.id });

    // Check if ID exists in cart
    const cart = await Cart.findById({ customerId: req.user.id });

    if (!cart) {
      // Create order
      cart = new Cart({
        customerId: customer._id,
        items: [],
      });
    }


    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    // Save cart
    await cart.save();

    // Return order
    res.status(200).send(cart);
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
module.exports = { addToCart, updateCart, deleteCart, getCart };

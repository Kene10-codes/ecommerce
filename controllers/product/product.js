const Customer = require("../../models/Customer");
const { orderValidator } = require("../../validator/order/order-validator");
const Product = require("../../models/Product");

// Order upload
const addProduct = async (req, res) => {
  try {
    const { productName, productDesc, quantity, price } = req.body;
    /// Create product
    const product = await Product.create({
      productName,
      productDesc,
      quantity,
      price,
    });

    // Return product
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    // paginate products
    const perPage = 10;
    const page = req.query.page || 1;
    const skip = perPage * page - perPage;

    const products = await Product.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(skip)
      .limit(perPage)
      .exec();

    // Check if product(s) exist
    if (!products || products.length === 0)
      return res.status(400).send("No product found");

    // Count the number of products
    const count = await Product.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    // Return products
    res.status(200).send({ products, nextPage: hasNextPage ? nextPage : null });
  } catch (error) {
    console.error(error);
  }
};

// Get product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (!product) return res.status(400).send("No product with ID found");

    // Return order
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
  }
};

// Export order controllers
module.exports = { addProduct, getProduct, getAllProducts };

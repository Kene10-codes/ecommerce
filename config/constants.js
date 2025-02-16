const MONGODB_URI_CONSTANT =
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodetut.n6pqp.mongodb.net/ecommerce?retryWrites=true&w=majority` ||
  "";

module.exports = {
  MONGODB_URI_CONSTANT,
};

const express = require("express");
const customerRoutes = require("../routes/customer/customer-routes");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1/customer", customerRoutes);
};

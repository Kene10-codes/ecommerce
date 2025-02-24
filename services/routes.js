const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
const customerRoutes = require("../routes/customer/customer-routes");
const adminRoutes = require("../routes/admin/admin-routes");
const cartRoutes = require("../routes/cart/cart-router");
const productRoutes = require("../routes/product/product-routes");

module.exports = (app) => {
  // Helmet  Initialize
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/api/v1/customer", customerRoutes);
  app.use("/api/v1/admin", adminRoutes);
  app.use("/api/v1/cart", cartRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
  });
};

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const customerRoutes = require("../routes/customer/customer-routes");
const adminRoutes = require("../routes/admin/admin-routes")

module.exports = (app) => {
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
  app.use("/api/v1/admin", adminRoutes)
};

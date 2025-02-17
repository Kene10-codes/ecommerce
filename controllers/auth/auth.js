const passport = require("passport");

const loginCustomerViaEmail = () => {
  passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/dashboard");
    };
};


module.exports = {
    loginCustomerViaEmail
}
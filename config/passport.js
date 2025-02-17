const passport = require("passport");

module.exports = function () {
  // Configure Passport with Google OAuth 2.0
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        // Here, you can save user info to the database
        return done(null, profile);
      }
    )
  );
};

const passport = require("passport")
const { Strategy: LocalStrategy } = require("passport-local");

//user from database

const User = require("../models/user");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .exec()
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  });
  

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username })
        .then((user) => {
          if (!user) return done(null, false, { message: "Invalid username!" });

          if (!user.validPassword(password)) {
            return done(null, false, { message: "Invalid passowrd!" });
          }

          return done(null, user);
        })
        .catch((error) => {
          return done(error, false);
        });
    })
  );
};
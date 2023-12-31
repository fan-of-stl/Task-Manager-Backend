const passport = require("passport");
const User = require("../models/user");
const isAuthenticated = require("../middleware/authenticationMiddleware");

// register a user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User register successfully!" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      res.status(400).json({ error: "username or email already exists." });
    } else {
      res.status(500).json({ error: "Registration Failed!" });
    }
  }
};

//log in a user
exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return res.status(500).json({ error: `Login failed!` });

    if (!user)
      return res.status(401).json({ error: "Invalid username or password!" });

    req.logIn(user, (err) => {
      console.log(user, err);
      if (err) return res.status(500).json({ error: "Login Failed!" });

      return res.status(200).json({ message: "Login successful!" });
    });
  })(req, res, next);
};

// Get user profile
exports.getUserProfile = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(401).json({ error: "Not authenticated" });
  }
};

exports.logout = (req, res) => {
  if (req.isAuthenticated()) {
    req.logout(function (err) {
      if (err) {
        // Handle any potential error during logout
        return res.status(500).json({ error: "Logout failed" });
      }
      res.status(200).json({ message: "User logged out successfully" });
    });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};

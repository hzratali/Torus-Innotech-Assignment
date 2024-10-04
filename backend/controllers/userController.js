const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret_key = "ABC";

// Register a new user
// POST /api/users/register
const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const securePassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: securePassword,
        isAdmin,
      });
      const data = { user: user.id };
      const token = jwt.sign(data, secret_key);
      res.status(200).json({
        message: "Registration successful. Please Sign in now",
        token,
        user,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login a user
// POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Return 404 when user is not found
      return res.status(404).json({ message: "User not exists" });
    } else {
      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        // Return 400 for invalid password
        return res.status(400).json({ message: "Invalid password" });
      } else {
        const data = { user: user.id };
        const token = jwt.sign(data, secret_key);
        res.status(200).json({ message: "Login successful", token, user });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user data by admin (protected)
// GET /api/users/me
const getMe = async (req, res) => {
  try {
    let user = await User.find();
    let filter = user.filter((ele) => ele._id.toString() !== req.user);
    res.json(filter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, getMe };

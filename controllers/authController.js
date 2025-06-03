const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidator,
  loginValidator,
} = require("../validators/validator");

const secretKey = process.env.JWT;

const login = async (req, res) => {
  const { email, password } = req.body;
  const { isValid, errors } = loginValidator(req.body);
  if (!isValid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "24h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const register = async (req, res) => {
  const { username, email, password, name, avatar, bio, address } = req.body;

  const { isValid, errors } = registerValidator(req.body);
  if (!isValid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      const field = existing.email === email ? "Email" : "Username";
      return res.status(400).json({ message: `${field} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      name,
      avatar,
      bio,
      address,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { register, login };

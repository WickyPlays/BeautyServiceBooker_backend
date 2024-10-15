const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel"); 

router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await user.save();
    res.status(200).send("User created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

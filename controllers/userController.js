import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

export const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  console.log(req.body);

  if (!email || !password || !firstname || !lastname || !username) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }

  res.send({ username, firstname, lastname, email, password });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userid: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error("Login controller error: ", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const checkUser = async (req, res) => {
  res
    .status(200)
    .json({ username: req.user.username, userid: req.user.userid });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const { password, ...rest } = user._doc;

    res.send(rest);
  } catch (error) {
    console.error("Get user controller error: ", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

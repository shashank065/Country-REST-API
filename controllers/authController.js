// controllers/authController.js

import User from '../models/User.js';
import { genSalt, hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
// User registration
export async function registerUser(req, res) {
  try {

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username: req.body.username } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);
    // Create a new user
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    // Create a JWT token
    const token = sign({ user: newUser.id }, JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
  
    res.status(500).json({ message: 'Server Error'  });
  }
}

// User login
export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    // Create a JWT token
    const token = sign({ user: user.id }, JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

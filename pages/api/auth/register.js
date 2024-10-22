// pages/api/auth/register.js
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
}

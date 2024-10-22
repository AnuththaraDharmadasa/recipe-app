// pages/api/auth/login.js
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
}

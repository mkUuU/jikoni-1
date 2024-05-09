// pages/api/register.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Dummy user storage for demonstration (replace with a real database)
const users = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    
    // Check if user already exists
    if (users.some((user) => user.username === username)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


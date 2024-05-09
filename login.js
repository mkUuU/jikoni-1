// pages/api/login.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Dummy secret key for JWT (use a secure and environment-based key in production)
const JWT_SECRET = 'your_jwt_secret_key';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Find user
    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


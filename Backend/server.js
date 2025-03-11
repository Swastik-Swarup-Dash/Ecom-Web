const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File path for user data
const USERS_FILE = path.join(__dirname, 'users.json');

// Initialize users file if it doesn't exist
async function initializeUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch (error) {
    await fs.writeFile(USERS_FILE, JSON.stringify([]));
  }
}

// Load users from file
async function loadUsers() {
  const data = await fs.readFile(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

// Save users to file
async function saveUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = await loadUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      res.json({ success: true, message: 'Login successful', username: user.username });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const users = await loadUsers();
    const existingUser = users.find(u => u.username === username || u.email === email);

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }

    const newUser = { username, email, password };
    users.push(newUser);
    await saveUsers(users);

    res.json({ success: true, message: 'Signup successful. Please log in.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Checkout endpoint (for demonstration, just clears cart on success)
app.post('/api/checkout', async (req, res) => {
  const { cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  // In a real system, you'd process payment here and save order details
  res.json({ success: true, message: 'Checkout successful. Thank you for your purchase!' });
});

// Start the server
initializeUsersFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${3000}`);
  });
});
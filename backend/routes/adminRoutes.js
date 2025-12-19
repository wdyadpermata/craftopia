const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    res.json({ message: 'Login berhasil' });
  });
});

module.exports = router;

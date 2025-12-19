const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes admin
const adminRoutes = require('./routes/adminRoutes');

// Pakai routes admin
app.use('/api/admin', adminRoutes);


// Import koneksi database
const db = require('./config/db');

// Import routes produk
const produkRoutes = require('./routes/produkRoutes');
app.use('/api/produk', produkRoutes);

// Rute sederhana untuk tes server
app.get('/', (req, res) => {
  res.send('Server Craftopia berjalan!');
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

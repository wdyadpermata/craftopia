const db = require('../config/db');

// Ambil semua data produk
exports.getAllProduk = (callback) => {
  db.query('SELECT * FROM produk', callback);
};

// Tambah produk baru
exports.addProduk = (data, callback) => {
  const query = 'INSERT INTO produk (nama_produk, harga, stok, deskripsi, gambar) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [data.nama_produk, data.harga, data.stok, data.deskripsi, data.gambar], callback);
};

exports.checkDuplicateProduk = (nama_produk, gambar, callback) => {
  const sql = `
    SELECT * FROM produk 
    WHERE LOWER(nama_produk) = LOWER(?) 
      OR gambar = ?
    LIMIT 1
  `;
  db.query(sql, [nama_produk, gambar], callback);
};


// Update produk
exports.updateProduk = (id, data, callback) => {
  const query = 'UPDATE produk SET nama_produk=?, harga=?, stok=?, deskripsi=?, gambar=? WHERE id=?';
  db.query(query, [data.nama_produk, data.harga, data.stok, data.deskripsi, data.gambar, id], callback);
};

// Hapus produk
exports.deleteProduk = (id, callback) => {
  const query = 'DELETE FROM produk WHERE id=?';
  db.query(query, [id], callback);
};

// Ambil produk berdasarkan ID
exports.getProdukById = (id, callback) => {
  db.query('SELECT * FROM produk WHERE id = ?', [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]); // hanya ambil satu produk
    }
  });
};

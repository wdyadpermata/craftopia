const produkModel = require('../models/produkModel');

// Ambil semua produk
exports.getAllProduk = (req, res) => {
  produkModel.getAllProduk((err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

// Ambil produk berdasarkan ID
exports.getProdukById = (req, res) => {
  const id = req.params.id;
  produkModel.getProdukById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (!result) {
      res.status(404).json({ message: 'Produk tidak ditemukan' });
    } else {
      res.json(result);
    }
  });
};

// Tambah produk
exports.addProduk = (req, res) => {
  console.log("DATA MASUK:", req.body);
  const data = req.body;
  const { nama_produk, gambar } = data;

  // 1. Validasi wajib isi
  if (!nama_produk || !gambar) {
    return res.status(400).json({
      message: "Nama produk dan foto wajib diisi"
    });
  }

  // 2. Cek produk dobel
  produkModel.checkDuplicateProduk(nama_produk, gambar, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (result.length > 0) {
      return res.status(409).json({
        message: "Produk dengan nama atau foto yang sama sudah ada"
      });
    }

    // 3. Jika aman → insert
    produkModel.addProduk(data, (err, results) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(201).json({
          message: "Produk berhasil ditambahkan",
          id: results.insertId
        });
      }
    });
  });
};


// Update produk
exports.updateProduk = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  produkModel.updateProduk(id, data, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Produk berhasil diperbarui' });
    }
  });
};

// Hapus produk
exports.deleteProduk = (req, res) => {
  const id = req.params.id;
  produkModel.deleteProduk(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Produk berhasil dihapus' });
    }
  });
};

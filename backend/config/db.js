const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'craftopia'
});

db.connect(err => {
  if (err) {
    console.log('Koneksi database gagal:', err);
  } else {
    console.log('Koneksi database berhasil!');
  }
});

module.exports = db;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaCartShopping, FaUser, FaXTwitter } from "react-icons/fa6";
import { FaBars, FaTimes, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function SemuaProdukPage() {
  const [produk, setProduk] = useState<any[]>([]);

  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const kategoriList = [
    "Semua",
    "Frame Art",
    "Pop Art",
    "Custom Gift"
  ];

  // Ambil semua produk
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produk")
      .then((res) => setProduk(res.data))
      .catch((err) => console.error("Gagal ambil produk:", err));
  }, []);

  const produkFiltered =
  kategoriAktif === "Semua"
    ? produk
    : produk.filter((p) =>
        p.nama_produk.toLowerCase().includes(kategoriAktif.toLowerCase())
      );


      return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
      
          {/* ================= HEADER ================= */}
          <header className="fixed top-0 left-0 w-full bg-[#3D5C8A]/90 backdrop-blur-md px-6 md:px-10 py-5 flex justify-between items-center z-50 text-white">
            <div className="flex items-center space-x-3">
              <img
                src="/Craftopia logo 2B.png"
                alt="Craftopia Logo"
                className="w-10 h-10 rounded-full border border-white/40"
              />
              <h1 className="text-2xl font-extrabold tracking-wide">CRAFTOPIA</h1>
            </div>
      
            <nav className="hidden md:flex items-center space-x-6 text-base font-semibold">
              <Link href="/produk" className="hover:text-teal-300">Produk</Link>
              <Link href="/#about" className="hover:text-teal-300">Tentang</Link>
              <Link href="/#contact" className="hover:text-teal-300">Kontak</Link>
              <FaCartShopping size={20} />
              <Link
                href="/admin/login"
                className="border border-white/40 px-4 py-1.5 rounded-lg text-sm hover:bg-white hover:text-[#0b1e3d]"
              >
                <FaUser size={14} />
              </Link>
            </nav>
          </header>
      
          {/* ================= MAIN ================= */}
          <main className="pt-28 px-6 md:px-20 pb-20">
      
            {/* Judul */}
            <h1 className="text-4xl font-bold text-center text-[#0b1e3d] mb-10">
              Semua Produk Craftopia
            </h1>
      
            {/* ================= KATEGORI ================= */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {kategoriList.map((kat) => (
                <button
                  key={kat}
                  onClick={() => setKategoriAktif(kat)}
                  className={`px-5 py-2 rounded-full font-semibold transition
                    ${
                      kategoriAktif === kat
                        ? "bg-teal-500 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-teal-50"
                    }`}
                >
                  {kat}
                </button>
              ))}
            </div>
      
            {/* ================= GRID PRODUK ================= */}
            {produkFiltered.length === 0 ? (
              <p className="text-center text-gray-500">Produk tidak ditemukan</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {produkFiltered.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl border overflow-hidden transition hover:-translate-y-1"
                  >
                    <img
                      src={`/${item.gambar}`}
                      alt={item.nama_produk}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-5">
                      <h4 className="font-semibold text-xl">{item.nama_produk}</h4>
                      <p className="text-[#1c3f72] font-bold text-lg mb-2">
                        Rp {item.harga}
                      </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.deskripsi}
                      </p>
                      <Link
                        href={`/produk/${item.id}`}
                        className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
      
          {/* ================= FOOTER ================= */}
          <footer className="bg-[#3D5C8A] text-gray-300 py-12 px-6 md:px-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src="/Craftopia logo 2B.png" className="w-10 h-10 rounded-full" />
                  <h2 className="text-2xl font-bold text-white">Craftopia</h2>
                </div>
                <p className="text-sm text-gray-200">
                  Hadiah dan dekorasi handmade penuh makna.
                </p>
              </div>
      
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt /> Gambut, Kalimantan Selatan
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhoneAlt /> +62 812 3456 7890
                  </li>
                  <li className="flex items-center gap-2">
                    <FaEnvelope /> craftopia.store@gmail.com
                  </li>
                </ul>
              </div>
      
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex gap-5 text-xl">
                  <FaFacebook />
                  <FaInstagram />
                  <FaTiktok />
                  <FaXTwitter />
                </div>
              </div>
            </div>
      
            <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-6">
              © {new Date().getFullYear()} Craftopia Store
            </div>
          </footer>
        </div>
      );
    }
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FaCartShopping, FaUser, FaXTwitter } from "react-icons/fa6";
import { FaBars, FaTimes, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function DetailProduk() {
  const { id } = useParams(); // ambil ID produk dari URL
  const [produk, setProduk] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/produk/${id}`)
        .then((res) => setProduk(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!produk) {
    return <p className="text-center mt-20 text-gray-500">Loading produk...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 h-[80px] left-0 w-full bg-[#3D5C8A] px-6 md:px-10 py-5 
        text-white flex justify-between items-center z-50">
        {/* Logo kiri */}
        <div className="flex items-center space-x-3">
          <img
            src="/Craftopia logo 2B.png"
            alt="Craftopia Logo"
            className="w-10 h-10 rounded-full border border-white/40"
          />
          <h1 className="text-2xl font-extrabold tracking-wide">CRAFTOPIA</h1>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-6 text-base font-semibold text-white">
          <Link href="/produk" className="hover:text-teal-300 transition">Produk</Link>
          <Link href="#about" className="hover:text-teal-300 transition">Tentang</Link>
          <Link href="#contact" className="hover:text-teal-300 transition">Kontak</Link>

          <FaCartShopping
            size={20}
            className="cursor-pointer hover:text-teal-300 transition"
          />

          <Link
            href="/admin/login"
            className="ml-2 border border-white/40 px-4 py-1.5 flex items-center gap-2 rounded-lg text-sm hover:bg-white hover:text-[#0b1e3d] transition"
          >
            <FaUser size={14} />
            Login
          </Link>
        </nav>
        
        {/* Menu Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <FaCartShopping
            size={20}
            className="cursor-pointer hover:text-teal-300 transition"
          />
          <button className="text-white" onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </header>

      {/* Detail Produk */}
      <div className="pt-28 flex flex-col md:flex-row items-center justify-center px-10 pb-20 md:px-20">
        <img
          src={`/${produk.gambar}`}
          alt={produk.nama_produk}
          className="rounded-2xl shadow-2xl w-80 md:w-96 border-4 border-gray-200 mt-4 md:mt-0"
        />
        <div className="mt-10 md:mt-0 md:ml-16 max-w-md">
          <h2 className="text-3xl font-bold mb-4">{produk.nama_produk}</h2>
          <p className="text-[#1c3f72] font-bold text-2xl mb-4">
            Rp {produk.harga}
          </p>
          <p className="text-gray-700 mb-6">{produk.deskripsi}</p>
          <p className="text-sm text-gray-500 mb-4">
            Stok: {produk.stok} unit
          </p>
          <a
            href={`https://wa.me/6282155178576?text=Halo%20Craftopia!%20Saya%20ingin%20memesan%20produk%20${encodeURIComponent(produk.nama_produk)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition"
          >
            🛒 Beli Sekarang
          </a>

        </div>
      </div>

      {/* ==================== Footer ==================== */}
    <footer className="bg-[#3D5C8A] text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center md:text-left">
        
        {/* Logo & Deskripsi */}
        <div>
          <div className="flex justify-center md:justify-start items-center space-x-3 mb-4">
            <img
              src="/Craftopia logo 2B.png"
              alt="Craftopia Logo"
              className="w-10 h-10 rounded-full border border-white/40"
            />
            <h2 className="text-2xl font-bold text-white">Craftopia</h2>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">
            Hadiah dan dekorasi handmade penuh makna.  
            Dibuat dengan cinta untuk setiap momen spesialmu 💖
          </p>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt size={16}/> Jl. Irigasi Malintang Baru, Gambut
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt size={16}/> +62 812 3456 7890
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope size={16}/> craftopia.store@gmail.com
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-5 text-xl">
            <a href="#" className="hover:text-teal-300 transition"><FaFacebook/></a>
            <a href="https://www.instagram.com/craftopia.ok?igsh=bzI0ZDZ4bng2bmU1" className="hover:text-teal-300 transition"><FaInstagram/></a>
            <a href="#" className="hover:text-teal-300 transition"><FaTiktok/></a>
            <a href="#" className="hover:text-teal-300 transition"><FaXTwitter/></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Craftopia Store. All rights reserved.
      </div>
    </footer>

    </div>
  );
}

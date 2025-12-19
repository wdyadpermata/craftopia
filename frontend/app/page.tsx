"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FaCartShopping, FaUser, FaXTwitter } from "react-icons/fa6";
import { FaBars, FaTimes, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false);
  const [produk, setProduk] = useState([]);

  // Ambil data produk dari backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produk")
      .then((res) => setProduk(res.data))
      .catch((err) => console.error("Gagal ambil produk:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#3D5C8A] text-white font-sans">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full bg-[#3D5C8A]/80 backdrop-blur-md px-6 md:px-10 py-5 flex justify-between items-center z-50">
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
        <nav className="hidden md:flex items-center space-x-6 text-base font-semibold">
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

      {/* ================= MENU MOBILE DROPDOWN ================= */}
      {openMenu && (
        <div className="md:hidden bg-[#3D5C8A] px-6 py-5 space-y-4 text-lg font-semibold fixed top-20 left-0 w-full z-40 shadow-lg">
          <Link href="#products" className="block hover:text-teal-300" onClick={() => setOpenMenu(false)}>Produk</Link>
          <Link href="#about" className="block hover:text-teal-300" onClick={() => setOpenMenu(false)}>Tentang</Link>
          <Link href="#contact" className="block hover:text-teal-300" onClick={() => setOpenMenu(false)}>Kontak</Link>

          <button className="mt-4 border border-white/40 px-4 py-1.5 flex items-center gap-2 rounded-lg text-sm hover:bg-white hover:text-[#0b1e3d] transition">
            <FaUser size={14} />
            Login
          </button>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-24 lg:px-32 pt-32 pb-24 bg-gradient-to-r from-[#0b1e3d] to-[#1c3f72] text-white">
        {/* Teks */}
        <div className="max-w-xl md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Hadiah Spesial dari <br /> Hati untuk yang Kamu Sayang 💖
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Setiap produk{" "}
            <span className="font-semibold text-teal-300">Craftopia</span>{" "}
            dibuat dengan cinta dan kreativitas — menjadikannya pilihan
            sempurna untuk kado, dekorasi, atau simbol kenangan berharga.
          </p>
          <a
            href="#products"
            className="bg-[#8ca9ff] hover:bg-[#6d8efc] transition px-8 py-3 rounded-xl font-semibold shadow-lg"
          >
            Lihat Produk
          </a>
        </div>

        {/* Gambar */}
        <div className="mt-12 md:mt-0 md:ml-16 flex justify-center md:justify-end w-full md:w-1/2">
          <div className="relative rounded-3xl overflow-hidden border-4 border-[#aab8f0]/30 shadow-2xl">
            <img
              src="/lavender.jpg"
              alt="Bunga Lavender"
              className="rounded-3xl w-[380px] md:w-[540px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= PRODUK UNGGULAN ================= */}
      <section id="products" className="px-10 py-20 bg-white text-gray-900 flex-1">
        <h3 className="text-3xl font-bold mb-10 text-center text-[#0b1e3d]">
          Produk Unggulan
        </h3>

        {produk.length === 0 ? (
          <p className="text-center text-gray-500">Loading produk...</p>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {produk.slice(0, 3).map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition transform hover:-translate-y-1"
              >
                <img
                  src={`/${item.gambar}`}
                  alt={item.nama_produk}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5">
                  <h4 className="font-semibold text-xl text-gray-800">
                    {item.nama_produk}
                  </h4>
                  <p className="text-[#1c3f72] font-bold text-lg mt-1 mb-3">
                    Rp {item.harga}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.deskripsi}
                  </p>
                  <a
                    href={`/produk/${item.id}`}
                    className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
                  >
                    Detail Produk
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= SLIDER PROMO ================= */}
      <section className="bg-[#f0f4ff] py-16 px-6 md:px-20 text-center">
  
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          className="rounded-2xl shadow-lg max-w-5xl mx-auto overflow-hidden"
        >
      {/* Slide 1 */}
        <SwiperSlide>
          <img
            src="/promo1.jpg"
            alt="Promo 1"
            className="w-full aspect-[3/1] object-cover rounded-2xl"
          />
        </SwiperSlide>

      {/* Slide 2 */}
        <SwiperSlide>
          <img
            src="/promo2.jpg"
            alt="Promo 2"
            className="w-full aspect-[3/1] object-cover rounded-2xl"
          />
        </SwiperSlide>

      {/* Slide 3 */}
        <SwiperSlide>
          <img
            src="/promo3.jpg"
            alt="Promo 3"
            className="w-full aspect-[3/1] object-cover rounded-2xl"
          />
        </SwiperSlide>
      </Swiper>
      </section>

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

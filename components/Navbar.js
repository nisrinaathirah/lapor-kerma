// components/Navbar.js
"use client"; // Tetap pakai "use client" karena ada interaktivitas (hover, dll)

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#003366] text-white px-6 py-4 flex justify-between items-center">
      {/* Logo + Title */}
      <div className="flex items-center gap-0">
        <img src="/logo.png" alt="Logo" className="w-25 h-25" />
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-lg">LAPOR KERMA</span>
          <span className="text-xs">Kementerian Pendidikan Tinggi, Sains, dan Teknologi</span>
        </div>
      </div>

      {/* Menu + Button */}
      <div className="flex items-center gap-6">
        <ul className="hidden md:flex gap-6">
          <li><Link href="/" className="hover:underline">Beranda</Link></li>
          <li><Link href="/direktori" className="hover:underline">Direktori</Link></li>
          <li><Link href="/statistik" className="hover:underline">Statistik</Link></li>
          <li><Link href="/FAQ" className="hover:underline">FAQ</Link></li>
        </ul>

        {/* Tombol Login */}
        <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500">
          Login
        </button>
      </div>
    </nav>
  );
}

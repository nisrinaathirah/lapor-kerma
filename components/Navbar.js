// components/Navbar.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    alert("Login berhasil!");
    setIsLoginOpen(false);
    // Jika perlu redirect setelah login:
    // router.push("/dashboard");
  };

  return (
    <>
      <nav className="bg-[#003366] text-white px-6 py-4 flex justify-between items-center">
        {/* Logo + Title */}
        <div className="flex items-center gap-0">
          <img src="/logo.png" alt="Logo" className="w-20 h-20" />
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

          {/* Tombol Login → Buka Modal */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-500"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Modal Login */}
      {isLoginOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsLoginOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon Home di pojok kiri atas */}
            <button
              onClick={() => {
                setIsLoginOpen(false);
                router.push("/");
              }}
              className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Kembali ke beranda"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 001 1h3m-6 0a1 1 0 001-1v-4a1 1 0 00-1-1h2M3 5a2 2 0 002 2h14a2 2 0 002-2V3a1 1 0 00-1-1H4a1 1 0 00-1 1v2z" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img src="/logo.png" alt="Logo LAPOR KERMA" className="w-16 h-16" />
            </div>

            {/* Form Login */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003366] text-gray-800 placeholder:text-gray-500"
                  required
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 4.5.75.75 0 01-.75-.75v-4.5a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75z" />
                </svg>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Masukkan sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003366] text-gray-800 placeholder:text-gray-500"
                  required
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v6h8z" />
                </svg>
              </div>

              {/* Lupa Sandi */}
              <div className="text-right">
                <button type="button" className="text-sm text-gray-600 hover:text-[#003366] font-medium">
                  Lupa sandi?
                </button>
              </div>

              {/* Tombol Login */}
              <button
                type="submit"
                className="w-full bg-[#003366] hover:bg-[#002c5b] text-white font-medium py-2 px-4 rounded transition-colors duration-300"
              >
                Login
              </button>

              {/* Daftar */}
              <div className="text-center text-sm text-gray-600">
                Belum punya akun?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginOpen(false);
                    router.push("/daftar");
                  }}
                  className="font-semibold text-[#003366] hover:underline"
                >
                  DAFTAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

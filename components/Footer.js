import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
      <footer className="bg-white  py-8 mt-0">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-sm text-[#003366]">
          
          {/* Bagian Kiri */}
<div className="space-y-2">
  <h3 className="font-kadwa text-[18px] font-bold">Kementerian Pendidikan</h3>
  <p className="font-kadwa text-[18px] font-bold pt-0 leading-tight">Tinggi, Sains, dan Teknologi</p>
  <p className="text-gray-800 font-sans">Gedung D</p>
  <p className="text-gray-800 font-sans">Jl. Jenderal Sudirman, Senayan</p>
</div>
  
          {/* Bagian Tengah */}
          <div className="space-y-2">
            <h3 className="font-kadwa text-[18px] font-bold">Tautan Penting</h3>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#" className="hover:underline">Beranda</a></li>
              <li><a href="#" className="hover:underline">Direktori</a></li>
              <li><a href="#" className="hover:underline">Statistik</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
  
          {/* Bagian Kanan */}
          <div className="space-y-2">
            <h3 className="font-kadwa text-[18px] font-bold ">Sosial Media</h3>
            <div className="flex gap-4 mt-2 text-gray-600">
              <a href="#" className="hover:text-[#003366]"><FaFacebookF /></a>
              <a href="#" className="hover:text-[#003366]"><FaInstagram /></a>
              <a href="#" className="hover:text-[#003366]"><FaTwitter /></a>
            </div>
          </div>
        </div>
  
        <div className="text-center text-xs text-gray-500 mt-6">
          © Copyright Dikti - Hak Cipta Dilindungi Undang-Undang
        </div>
      </footer>
    );
}

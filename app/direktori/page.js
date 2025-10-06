"use client";

import { useState, useMemo, useEffect } from "react";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [showKerjasama, setShowKerjasama] = useState(false);
  const [showKegiatan, setShowKegiatan] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State untuk data dari API
  const [kerjasamaData, setKerjasamaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State filter
  const [selectedKerjasama, setSelectedKerjasama] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);
  const [showAllKegiatanTable, setShowAllKegiatanTable] = useState(false);

  // Fetch data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url = "http://localhost:8000/api/kerjasama";
        if (selectedKerjasama) {
          url += `?type=${selectedKerjasama}`;
        }
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('Gagal mengambil data kerjasama');
        const data = await res.json();
        setKerjasamaData(data);
      } catch (err) {
        console.error('Error:', err);
        setError('Gagal memuat data. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedKerjasama]);

  // Fungsi pilih filter
  const selectKerjasama = (type) => {
    setSelectedKerjasama(type);
    setSelectedStatus(null);
    setSelectedKegiatan(null);
    setShowAllKegiatanTable(false);
    setCurrentPage(1);
    setSearch("");
  };

  const selectStatus = (status) => {
    setSelectedStatus(status);
    setSelectedKerjasama(null);
    setSelectedKegiatan(null);
    setShowAllKegiatanTable(false);
    setCurrentPage(1);
    setSearch("");
  };

  const selectKegiatan = (kegiatan) => {
    setSelectedKegiatan(kegiatan);
    setSelectedKerjasama(null);
    setSelectedStatus(null);
    setShowAllKegiatanTable(false);
    setCurrentPage(1);
    setSearch("");
  };

  // Cek apakah ada filter aktif
  const hasActiveFilter = selectedKerjasama || selectedStatus || selectedKegiatan;

  // === Daftar lengkap bentuk kegiatan ===
  const allKegiatanNames = [
    "Pertukaran Pelajar-Kampus Merdeka",
    "Magang/ Praktik Kerja-Kampus Merdeka",
    "Asistensi Mengajar di Satuan Pendidikan-Kampus Merdeka",
    "Penelitian/Riset-Kampus Merdeka",
    "Membangun Desa/KKN Tematik-Kampus Merdeka",
    "Studi/Proyek Independen-Kampus Merdeka",
    "Kegiatan Wirausaha-Kampus Merdeka",
    "Proyek Kemanusiaan-Kampus Merdeka",
    "Gelar Bersama (Joint Degree)",
    "Gelar Ganda (Dual Degree)",
    "Pertukaran Mahasiswa",
    "Penerbitan Berkala Ilmiah",
    "Pemagangan",
    "Penyelenggaraan Seminar/Konferensi Ilmiah",
    "Penelitian Bersama",
    "Pengabdian Kepada Masyarakat",
    "Pertukaran Dosen",
    "Penelitian Bersama - Paten",
    "Penelitian Bersama - Prototipe",
    "Penelitian Bersama - Artikel/Jurnal Ilmiah",
    "Pengembangan Kurikulum/Program Bersama",
    "Penyaluran Lulusan",
    "Pengiriman Praktisi sebagai Dosen",
    "Pelatihan Dosen dan Instruktur",
    "Transfer Kredit",
    "Visiting Professor",
    "Pengembangan Pusat Penelitian dan Pengembangan Keilmuan",
    "Pengembangan Sistem / Produk",
    "Pelatihan"
  ];

  // === Top 5 Bentuk Kegiatan ===
  const top5Kegiatan = useMemo(() => {
    const count = {};
    kerjasamaData.forEach(item => {
      if (allKegiatanNames.includes(item.bentuk_kegiatan)) {
        count[item.bentuk_kegiatan] = (count[item.bentuk_kegiatan] || 0) + 1;
      }
    });
    return Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([kegiatan]) => kegiatan);
  }, [kerjasamaData]);

  // === Ringkasan SEMUA kegiatan (29 item) ===
  const allKegiatanSummary = useMemo(() => {
    return allKegiatanNames.map((kegiatan, index) => {
      const jumlah = kerjasamaData.filter(item => item.bentuk_kegiatan === kegiatan).length;
      return {
        no: index + 1,
        bentukKegiatan: kegiatan,
        jumlah
      };
    });
  }, [kerjasamaData]);

  // === Filter data untuk kerjasama/status ===
  let filteredData = [...kerjasamaData];
  if (selectedKerjasama) {
    filteredData = filteredData.filter(item => item.bentuk_kerjasama === selectedKerjasama);
  } else if (selectedStatus) {
    filteredData = filteredData.filter(item => item.status_kerjasama === selectedStatus);
  } else if (selectedKegiatan) {
    filteredData = filteredData.filter(item => item.bentuk_kegiatan === selectedKegiatan);
  }

  // Terapkan pencarian
  if (!showAllKegiatanTable) {
    filteredData = filteredData.filter(item =>
      item.judul_kerjasama.toLowerCase().includes(search.toLowerCase()) ||
      item.bentuk_kegiatan.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // === Ringkasan untuk 1 kegiatan spesifik ===
  const kegiatanSummary = useMemo(() => {
    if (!selectedKegiatan) return [];
    const data = kerjasamaData.filter(item => item.bentuk_kegiatan === selectedKegiatan);
    return [{ no: 1, bentukKegiatan: selectedKegiatan, jumlah: data.length }];
  }, [selectedKegiatan]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white px-4 py-8 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white px-4 py-8 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#003366] text-white rounded hover:bg-blue-800"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">Direktori</h1>
        <p className="text-gray-600">
          Daftar kerja sama institusi dalam dan luar negeri
        </p>
        <hr className="my-6 border-[#003366]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-4 gap-6 flex-grow">
        {/* Sidebar Filter */}
        <aside>
          <div className="px-4">
            <h2 className="text-lg font-semibold text-[#003366] mb-2">Filter</h2>
          </div>

          <div className="flex flex-col px-4">
            {/* BENTUK KERJASAMA */}
            <button
              onClick={() => setShowKerjasama(!showKerjasama)}
              className="w-full bg-[#003366] text-white px-4 py-2 rounded-t-lg text-left transition flex justify-between items-center"
            >
              Bentuk Kerjasama
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transform transition-transform ${showKerjasama ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {showKerjasama && (
              <>
                <button
                  onClick={() => selectKerjasama("MoU")}
                  className={`w-full px-4 py-2 text-left text-sm pl-6 transition rounded-none ${
                    selectedKerjasama === "MoU"
                      ? "bg-blue-800 text-white"
                      : "bg-[#003366] text-white hover:bg-blue-800"
                  }`}
                >
                  MoU
                </button>
                <button
                  onClick={() => selectKerjasama("MoA")}
                  className={`w-full px-4 py-2 text-left text-sm pl-6 transition rounded-none ${
                    selectedKerjasama === "MoA"
                      ? "bg-blue-800 text-white"
                      : "bg-[#003366] text-white hover:bg-blue-800"
                  }`}
                >
                  MoA
                </button>
                <button
                  onClick={() => selectKerjasama("IA")}
                  className={`w-full px-4 py-2 text-left text-sm pl-6 transition rounded-none ${
                    selectedKerjasama === "IA"
                      ? "bg-blue-800 text-white"
                      : "bg-[#003366] text-white hover:bg-blue-800"
                  }`}
                >
                  IA
                </button>
              </>
            )}

            {/* BENTUK KEGIATAN */}
            <button
              onClick={() => setShowKegiatan(!showKegiatan)}
              className="w-full bg-[#003366] text-white px-4 py-2 text-left transition flex justify-between items-center rounded-none"
            >
              Bentuk Kegiatan
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transform transition-transform ${showKegiatan ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {showKegiatan && (
              <>
                {top5Kegiatan.map((kegiatan) => (
                  <button
                    key={kegiatan}
                    onClick={() => selectKegiatan(kegiatan)}
                    className={`w-full px-4 py-2 text-left text-sm pl-6 transition rounded-none ${
                      selectedKegiatan === kegiatan
                        ? "bg-blue-800 text-white"
                        : "bg-[#003366] text-white hover:bg-blue-800"
                    }`}
                  >
                    {kegiatan}
                  </button>
                ))}
                {top5Kegiatan.length > 0 && (
                  <button
                    onClick={() => setShowAllKegiatanTable(true)}
                    className="w-full px-4 py-2 text-left text-sm pl-6 text-white bg-[#003366] hover:bg-blue-800 transition rounded-none"
                  >
                    More...
                  </button>
                )}
                {top5Kegiatan.length === 0 && (
                  <button className="w-full px-4 py-2 text-left text-sm pl-6 text-gray-400 bg-[#003366] rounded-none">
                    Tidak ada data
                  </button>
                )}
              </>
            )}

            {/* STATUS KERJASAMA */}
            <button
              onClick={() => setShowStatus(!showStatus)}
              className={`w-full bg-[#003366] text-white px-4 py-2 text-left transition flex justify-between items-center ${
                !showStatus ? "rounded-b-lg" : "rounded-none"
              }`}
            >
              Status Kerjasama
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transform transition-transform ${showStatus ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {showStatus && (
              <>
                <button
                  onClick={() => selectStatus("aktif")}
                  className={`w-full px-4 py-2 text-left text-sm pl-6 transition rounded-none ${
                    selectedStatus === "Aktif"
                      ? "bg-blue-800 text-white"
                      : "bg-[#003366] text-white hover:bg-blue-800"
                  }`}
                >
                  Aktif
                </button>
                <button
                  onClick={() => selectStatus("kadaluarsa")}
                  className={`w-full px-4 py-2 text-left text-sm pl-6 transition rounded-none ${
                    selectedStatus === "Kadaluarsa"
                      ? "bg-blue-800 text-white"
                      : "bg-[#003366] text-white hover:bg-blue-800"
                  }`}
                >
                  Kadaluarsa
                </button>
                <button
                  onClick={() => selectStatus("perpanjangan")}
                  className={`w-full px-4 py-2 text-left text-sm pl-6 transition rounded-b-lg ${
                    selectedStatus === "Perpanjangan"
                      ? "bg-blue-800 text-white"
                      : "bg-[#003366] text-white hover:bg-blue-800"
                  }`}
                >
                  Perpanjangan
                </button>
              </>
            )}
          </div>
        </aside>

        {/* Konten kanan */}
        <main className="md:col-span-3 bg-white">
          {/* Search Bar */}
          {(hasActiveFilter || showAllKegiatanTable) && (
            <div className="mb-6">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#003366"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 left-10 w-[1px] bg-gray-300"></div>
                <input
                  type="text"
                  placeholder={
                    showAllKegiatanTable
                      ? "Search bentuk kegiatan..."
                      : "Search directory"
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-2.5 pl-16 pr-4 bg-white border border-[#003366] rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Tampilan utama */}
{!hasActiveFilter && !showAllKegiatanTable ? (
  <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
    <p className="text-gray-500 text-center px-4">
      Pilih salah satu filter di sebelah kiri untuk menampilkan data kerja sama.
    </p>
  </div>
) : showAllKegiatanTable ? (
  // === TABEL RINGKASAN SEMUA KEGIATAN (tetap seperti sebelumnya) ===
  <>
    <p className="text-sm text-gray-600 mt-2 mb-4">
      Menampilkan {allKegiatanSummary.length} bentuk kegiatan
    </p>
    <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#003366] text-white">
            <th className="px-4 py-3 text-left font-bold min-w-12">No</th>
            <th className="px-4 py-3 text-left font-bold">Bentuk Kegiatan</th>
            <th className="px-4 py-3 text-left font-bold min-w-32 text-center">Jumlah Kerjasama</th>
          </tr>
        </thead>
        <tbody>
          {allKegiatanSummary
            .filter(item =>
              item.bentukKegiatan.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <tr
                key={item.no}
                className="bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <td className="px-4 py-3 border-t border-gray-200 text-[#003366] font-medium min-w-12">
                  {item.no}.
                </td>
                <td className="px-4 py-3 border-t border-gray-200 font-bold text-[#003366] min-w-0 truncate">
                  {item.bentukKegiatan}
                </td>
                <td className="px-4 py-3 border-t border-gray-200 text-[#003366] text-center min-w-32">
                  {item.jumlah}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </>
) : (selectedKerjasama || selectedStatus || selectedKegiatan) && filteredData.length > 0 ? (
  // === TABEL DETAIL KERJASAMA (untuk semua filter) ===
<>
  <p className="text-sm text-gray-600 mt-2 mb-4">
    Menampilkan {currentData.length} dari {filteredData.length} hasil
  </p>
  <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-[#003366] text-white">
          <th className="px-4 py-3 text-left font-bold min-w-12">No</th>
          
          {/* Nama Mitra hanya untuk Bentuk Kerjasama & Bentuk Kegiatan */}
          {(selectedKerjasama || selectedKegiatan) && (
            <th className="px-4 py-3 text-left font-bold">Nama Mitra</th>
          )}
          
          {/* Judul Kerjasama hanya untuk Status */}
          {selectedStatus && (
            <th className="px-4 py-3 text-left font-bold">Judul Kerjasama</th>
          )}
          
          {/* Kolom tambahan spesifik */}
          {selectedKerjasama && (
            <>
              <th className="px-4 py-3 text-left font-bold min-w-32 text-center">Jumlah</th>
              <th className="px-4 py-3 text-left font-bold">Bentuk Kerjasama</th>
            </>
          )}
          {selectedKegiatan && (
            <>
              <th className="px-4 py-3 text-left font-bold min-w-32 text-center">Jumlah</th>
              <th className="px-4 py-3 text-left font-bold">Bentuk Kegiatan</th>
            </>
          )}
          {selectedStatus && (
            <th className="px-4 py-3 text-left font-bold">Status</th>
          )}
        </tr>
      </thead>
      <tbody>
        {currentData.map((item, index) => (
          <tr
            key={item.id}
            className={`${index % 2 === 0 ? "bg-blue-50" : "bg-blue-100"} hover:bg-blue-200 transition-colors`}
          >
            <td className="px-4 py-3 border-t border-gray-200 text-[#003366] font-medium min-w-12">
              {startIndex + index + 1}.
            </td>
            
            {/* Nama Mitra hanya untuk Bentuk Kerjasama & Bentuk Kegiatan */}
            {(selectedKerjasama || selectedKegiatan) && (
              <td className="px-4 py-3 border-t border-gray-200 font-bold text-[#003366] min-w-0 truncate">
                {item.nama_mitra}
              </td>
            )}
            
            {/* Judul Kerjasama hanya untuk Status */}
            {selectedStatus && (
              <td className="px-4 py-3 border-t border-gray-200 font-bold text-[#003366] min-w-0 truncate">
                {item.judul_kerjasama}
              </td>
            )}
            
            {/* Kolom tambahan spesifik */}
            {selectedKerjasama && (
              <>
                <td className="px-4 py-3 border-t border-gray-200 text-[#003366] text-center min-w-32">
                  1
                </td>
                <td className="px-4 py-3 border-t border-gray-200 min-w-0 truncate">
                  <span className="text-[#003366]">{item.bentuk_kerjasama}</span>
                </td>
              </>
            )}
            {selectedKegiatan && (
              <>
                <td className="px-4 py-3 border-t border-gray-200 text-[#003366] text-center min-w-32">
                  1
                </td>
                <td className="px-4 py-3 border-t border-gray-200 min-w-0 truncate">
                  <span className="text-[#003366]">{item.bentuk_kegiatan}</span>
                </td>
              </>
            )}
            {selectedStatus && (
              <td className="px-4 py-3 border-t border-gray-200 min-w-0 truncate">
                <span className="text-[#003366]">{item.status_kerjasama}</span>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="flex justify-end mt-4 gap-1">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-3 py-1 text-xs border rounded transition ${
        currentPage === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-800 hover:bg-gray-100"
      }`}
    >
      Previous
    </button>
    <span className="px-3 py-1 text-xs bg-white border border-gray-300 rounded text-gray-800 font-medium flex items-center">
      {currentPage}
    </span>
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-3 py-1 text-xs border rounded transition ${
        currentPage === totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-800 hover:bg-gray-100"
      }`}
    >
      Next
    </button>
  </div>
</>
) : (
  <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg border">
    <p className="text-gray-500">Tidak ada data yang sesuai dengan filter.</p>
  </div>
)}
        </main>
      </div>
    </div>
  );
}

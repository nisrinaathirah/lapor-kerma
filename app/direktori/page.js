"use client";

import { useState, useMemo } from "react";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [showKerjasama, setShowKerjasama] = useState(false);
  const [showKegiatan, setShowKegiatan] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State filter
  const [selectedKerjasama, setSelectedKerjasama] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedKegiatan, setSelectedKegiatan] = useState();
  const [showAllKegiatanTable, setShowAllKegiatanTable] = useState(false);

  // Fungsi pilih filter
  const selectKerjasama = (type) => {
    setSelectedKerjasama(type);
    setSelectedStatus(undefined);
    setSelectedKegiatan(undefined);
    setShowAllKegiatanTable(false);
    setCurrentPage(1);
    setSearch("");
  };

  const selectStatus = (status) => {
    setSelectedStatus(status);
    setSelectedKerjasama(undefined);
    setSelectedKegiatan(undefined);
    setShowAllKegiatanTable(false);
    setCurrentPage(1);
    setSearch("");
  };

  const selectKegiatan = (kegiatan) => {
    setSelectedKegiatan(kegiatan);
    setSelectedKerjasama(undefined);
    setSelectedStatus(undefined);
    setShowAllKegiatanTable(false);
    setCurrentPage(1);
    setSearch("");
  };

  // Cek apakah ada filter aktif
  const hasActiveFilter = !!selectedKerjasama || !!selectedStatus || !!selectedKegiatan;

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

  // Data lengkap kerja sama
  const allKerjasamaData = [
    { id: 1, instansi: "Universitas Gadjah Mada", bentuk: "MoU", bentukKegiatan: "Penelitian/Riset-Kampus Merdeka", judul: "Kerja Sama Riset 2023", status: "Aktif" },
    { id: 2, instansi: "Universitas Indonesia", bentuk: "MoA", bentukKegiatan: "Pertukaran Mahasiswa", judul: "Pertukaran Mahasiswa", status: "Kadaluarsa" },
    { id: 3, instansi: "Universitas Airlangga", bentuk: "IA", bentukKegiatan: "Pelatihan Dosen dan Instruktur", judul: "Pelatihan Dosen", status: "Perpanjangan" },
    { id: 4, instansi: "Universitas Gunadarma", bentuk: "MoU", bentukKegiatan: "Penelitian/Riset-Kampus Merdeka", judul: "Pengembangan Kurikulum", status: "Aktif" },
    { id: 5, instansi: "Universitas Padjadjaran", bentuk: "MoA", bentukKegiatan: "Pertukaran Mahasiswa", judul: "Kerja Praktek Bersama", status: "Aktif" },
    { id: 6, instansi: "Universitas Brawijaya", bentuk: "IA", bentukKegiatan: "Penyelenggaraan Seminar/Konferensi Ilmiah", judul: "Workshop Internasional", status: "Kadaluarsa" },
    { id: 7, instansi: "Institut Teknologi Bandung", bentuk: "MoU", bentukKegiatan: "Gelar Bersama (Joint Degree)", judul: "Joint Degree Program", status: "Perpanjangan" },
    { id: 8, instansi: "Universitas Sebelas Maret", bentuk: "MoA", bentukKegiatan: "Penelitian/Riset-Kampus Merdeka", judul: "Penelitian Kolaboratif", status: "Aktif" },
    { id: 9, instansi: "Universitas Diponegoro", bentuk: "IA", bentukKegiatan: "Pelatihan Dosen dan Instruktur", judul: "Publikasi Bersama", status: "Kadaluarsa" },
    { id: 10, instansi: "Universitas Negeri Yogyakarta", bentuk: "MoU", bentukKegiatan: "Pengabdian Kepada Masyarakat", judul: "Pengabdian Masyarakat", status: "Aktif" },
  ];

  // === Top 5 Bentuk Kegiatan ===
  const top5Kegiatan = useMemo(() => {
    const count = {};
    allKerjasamaData.forEach(item => {
      if (allKegiatanNames.includes(item.bentukKegiatan)) {
        count[item.bentukKegiatan] = (count[item.bentukKegiatan] || 0) + 1;
      }
    });
    return Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([kegiatan]) => kegiatan);
  }, []);

  // === Ringkasan SEMUA kegiatan (29 item) ===
  const allKegiatanSummary = useMemo(() => {
    return allKegiatanNames.map((kegiatan, index) => {
      const jumlah = allKerjasamaData.filter(item => item.bentukKegiatan === kegiatan).length;
      return {
        no: index + 1,
        bentukKegiatan: kegiatan,
        jumlah
      };
    });
  }, [allKerjasamaData]);

  // === Filter data untuk kerjasama/status ===
  let filteredData = [...allKerjasamaData];
  if (selectedKerjasama) {
    filteredData = filteredData.filter(item => item.bentuk === selectedKerjasama);
  } else if (selectedStatus) {
    filteredData = filteredData.filter(item => item.status === selectedStatus);
  }

  // Terapkan pencarian
  if (!selectedKegiatan && !showAllKegiatanTable) {
    filteredData = filteredData.filter(item =>
      item.instansi.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // === Ringkasan untuk 1 kegiatan spesifik ===
  const kegiatanSummary = useMemo(() => {
    if (!selectedKegiatan) return [];
    const data = allKerjasamaData.filter(item => item.bentukKegiatan === selectedKegiatan);
    return [{ no: 1, bentukKegiatan: selectedKegiatan, jumlah: data.length }];
  }, [selectedKegiatan]);

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-[#003366] mb-2">Direktori</h1>
        <p className="text-gray-600">
          Pilih filter untuk menampilkan data kerja sama instansi
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
                  onClick={() => selectStatus("Aktif")}
                  className={`w-full px-4 py-2 text-left text-sm pl-6 transition rounded-none ${
                    selectedStatus === "Aktif"
                      ? "bg-blue-800 text-white"
                      : "bg-[#003366] text-white hover:bg-blue-800"
                  }`}
                >
                  Aktif
                </button>
                <button
                  onClick={() => selectStatus("Kadaluarsa")}
                  className={`w-full px-4 py-2 text-left text-sm pl-6 transition rounded-none ${
                    selectedStatus === "Kadaluarsa"
                      ? "bg-blue-800 text-white"
                      : "bg-[#003366] text-white hover:bg-blue-800"
                  }`}
                >
                  Kadaluarsa
                </button>
                <button
                  onClick={() => selectStatus("Perpanjangan")}
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
            // === TABEL LENGKAP SEMUA KEGIATAN ===
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
          ) : selectedKegiatan ? (
            // === TABEL 1 KEGIATAN ===
            <>
              <p className="text-sm text-gray-600 mt-2 mb-4">
                Menampilkan 1 hasil
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
                    {kegiatanSummary.map((item) => (
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
          ) : filteredData.length === 0 ? (
            <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">Tidak ada data yang sesuai dengan filter.</p>
            </div>
          ) : (
            // === TABEL KERJASAMA / STATUS ===
            <>
              <p className="text-sm text-gray-600 mt-2 mb-4">
                Menampilkan {currentData.length} dari {filteredData.length} hasil
              </p>
              <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#003366] text-white">
                      <th className="px-4 py-3 text-left font-bold min-w-12">No</th>
                      <th className="px-4 py-3 text-left font-bold">Nama Instansi</th>
                      {selectedKerjasama && (
                        <>
                          <th className="px-4 py-3 text-left font-bold min-w-32 text-center">Jumlah Kerjasama</th>
                          <th className="px-4 py-3 text-left font-bold">Bentuk Kerjasama</th>
                        </>
                      )}
                      {selectedStatus && (
                        <>
                          <th className="px-4 py-3 text-left font-bold">Judul Kerjasama</th>
                          <th className="px-4 py-3 text-left font-bold">Status</th>
                        </>
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
                        <td className="px-4 py-3 border-t border-gray-200 font-bold text-[#003366] min-w-0 truncate">
                          {item.instansi}
                        </td>
                        {selectedKerjasama && (
                          <>
                            <td className="px-4 py-3 border-t border-gray-200 text-[#003366] text-center min-w-32">
                              1
                            </td>
                            <td className="px-4 py-3 border-t border-gray-200 min-w-0 truncate">
                              <span className="text-[#003366]">{item.bentuk}</span>
                            </td>
                          </>
                        )}
                        {selectedStatus && (
                          <>
                            <td className="px-4 py-3 border-t border-gray-200 min-w-0 truncate">
                              <span className="text-[#003366]">{item.judul}</span>
                            </td>
                            <td className="px-4 py-3 border-t border-gray-200 min-w-0 truncate">
                              <span className="text-[#003366]">{item.status}</span>
                            </td>
                          </>
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
          )}
        </main>
      </div>
    </div>
  );
}

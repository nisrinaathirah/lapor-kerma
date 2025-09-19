"use client";

import { useState } from "react";
import Link from "next/link";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [showKerjasama, setShowKerjasama] = useState(false);
  const [showKegiatan, setShowKegiatan] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const directoryData = [
    { id: 1, name: "Universitas Gadjah Mada", jumlah: 348 },
    { id: 2, name: "Universitas Indonesia", jumlah: 345 },
    { id: 3, name: "Universitas Airlangga", jumlah: 329 },
    { id: 4, name: "Universitas Gunadarma", jumlah: 327 },
    { id: 5, name: "Universitas Padjadjaran", jumlah: 314 },
    { id: 6, name: "Universitas Brawijaya", jumlah: 311 },
    { id: 7, name: "Institut Teknologi Bandung", jumlah: 305 },
    { id: 8, name: "Universitas Sebelas Maret", jumlah: 298 },
    { id: 9, name: "Universitas Diponegoro", jumlah: 290 },
    { id: 10, name: "Universitas Negeri Yogyakarta", jumlah: 285 },
  ];

  const filteredData = directoryData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-[#003366]">Direktori</h1>
            <p className="mt-2 text-gray-700 md:whitespace-nowrap">
              Temukan dan telusuri semua institusi pendidikan yang terlibat dalam kerja sama
            </p>
          </div>
        </div>
        <div className="border-t border-[#003366] mt-6"></div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-4 gap-6 flex-grow">
{/* Sidebar Filter */}
<aside>
  <div className="px-4">
    <h2 className="text-lg font-semibold text-[#003366] mb-2">Filter</h2>
  </div>

  <div className="flex flex-col px-4">

    {/* === BENTUK KERJASAMA === */}
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
        <button className="w-full bg-[#003366] text-white px-4 py-2 text-left text-sm pl-6 hover:bg-blue-800 transition rounded-none">
          MOU
        </button>
        <button className="w-full bg-[#003366] text-white px-4 py-2 text-left text-sm pl-6 hover:bg-blue-800 transition rounded-none">
          MOA
        </button>
        <button className="w-full bg-[#003366] text-white px-4 py-2 text-left text-sm pl-6 hover:bg-blue-800 transition rounded-none">
          IA
        </button>
      </>
    )}

    {/* === BENTUK KEGIATAN === */}
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
        <button className="w-full bg-[#003366] text-white px-4 py-2 text-left text-sm pl-6 hover:bg-blue-800 transition rounded-none">
          Monitoring
        </button>
        <button className="w-full bg-[#003366] text-white px-4 py-2 text-left text-sm pl-6 hover:bg-blue-800 transition rounded-none">
          Verifikasi
        </button>
        <button className="w-full bg-[#003366] text-white px-4 py-2 text-left text-sm pl-6 hover:bg-blue-800 transition rounded-none">
          Pelaporan
        </button>
      </>
    )}

    {/* === STATUS KERJASAMA === */}
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
        <button className="w-full bg-[#003366] text-white px-4 py-2 text-left text-sm pl-6 hover:bg-blue-800 transition rounded-none">
          Aktif
        </button>
        <button className="w-full bg-[#003366] text-white px-4 py-2 text-left text-sm pl-6 hover:bg-blue-800 transition rounded-none">
          Kadaluarsa
        </button>
        <button className="w-full bg-[#003366] text-white px-4 py-2 text-left text-sm pl-6 hover:bg-blue-800 transition rounded-b-lg">
          Perpanjangan
        </button>
      </>
    )}

  </div>
</aside>

        {/* Konten kanan */}
        <main className="md:col-span-3 bg-white">
          {/* Search Bar */}
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
                placeholder="Search directory"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 pl-16 pr-4 bg-white border border-[#003366] rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
              />
            </div>
          </div>

          {/* Showing Results */}
          <p className="text-sm text-gray-600 mt-2 mb-4">
            Showing {currentData.length} of {filteredData.length} result
            {filteredData.length !== 1 ? "s" : ""}
          </p>

          {/* Table */}
          <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-bold text-[#003366]">No</th>
                  <th className="px-4 py-3 text-left font-bold text-[#003366]">Nama Instansi</th>
                  <th className="px-4 py-3 text-left font-bold text-[#003366]">Jumlah Kerjasama</th>
                  <th className="px-4 py-3 text-left font-bold text-[#003366]">Bentuk Kegiatan</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-blue-100"
                    } hover:bg-blue-200 transition-colors`}
                  >
                    <td className="px-4 py-3 border-t border-gray-200 text-[#003366]">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200 font-medium text-[#003366]">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200 text-[#003366] text-center">
                      {item.jumlah}
                    </td>
                    <td className="px-4 py-3 border-t border-gray-200">
                      <span className="font-semibold text-[#003366] cursor-pointer hover:underline transition">
                        Join Research
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
        </main>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link"; // 

// Data titik (negara + jumlah kerjasama)
const markers = [
  { id: 1, name: "United States", lat: 37.0902, lng: -95.7129, moa: 12, mou: 8, ia: 5 },
  { id: 2, name: "Germany", lat: 51.1657, lng: 10.4515, moa: 6, mou: 15, ia: 3 },
  { id: 3, name: "Japan", lat: 36.2048, lng: 138.2529, moa: 9, mou: 11, ia: 7 },
  { id: 4, name: "Australia", lat: -25.2744, lng: 133.7751, moa: 4, mou: 6, ia: 2 },
  { id: 5, name: "Brazil", lat: -14.2350, lng: -51.9253, moa: 3, mou: 5, ia: 1 },
  { id: 6, name: "Indonesia", lat: -6.2088, lng: 106.8456, moa: 20, mou: 25, ia: 10 },
];

// Data pertumbuhan tahunan
const yearlyData = {
  years: ["2019", "2020", "2021", "2022", "2023", "2024"],
  MoU: [1902, 1126, 2408, 967, 0, 0],
  MoA: [758, 940, 543, 448, 0, 0],
  IA: [592, 438, 881, 329, 0, 0],
};

// Hitung rata-rata per tahun
const avgMoU = Math.round(yearlyData.MoU.reduce((a, b) => a + b, 0) / yearlyData.MoU.length);
const avgMoA = Math.round(yearlyData.MoA.reduce((a, b) => a + b, 0) / yearlyData.MoA.length);
const avgIA = Math.round(yearlyData.IA.reduce((a, b) => a + b, 0) / yearlyData.IA.length);

// Data Top 10 Income Generate
const incomeData = [
  { no: 1, instansi: "Universitas Indonesia", jumlah: 504897 },
  { no: 2, instansi: "Institut Teknologi Bandung", jumlah: 480123 },
  { no: 3, instansi: "Universitas Gadjah Mada", jumlah: 450789 },
  { no: 4, instansi: "Universitas Airlangga", jumlah: 420567 },
  { no: 5, instansi: "Universitas Padjadjaran", jumlah: 398432 },
  { no: 6, instansi: "Universitas Diponegoro", jumlah: 375210 },
  { no: 7, instansi: "Universitas Brawijaya", jumlah: 350987 },
  { no: 8, instansi: "Universitas Sebelas Maret", jumlah: 330654 },
  { no: 9, instansi: "Universitas Hasanuddin", jumlah: 310321 },
  { no: 10, instansi: "Universitas Andalas", jumlah: 295876 },
];

// Data Top 5 Klasifikasi Mitra
const mitraData = {
  labels: ["Institusi Pendidikan", "Perusahaan", "Pemerintah", "Organisasi Internasional", "Lainnya"],
  data: [120, 80, 70, 90, 60],
};

// Data Top 5 Bentuk Kegiatan
const kegiatanData = {
  labels: ["Magang", "Penelitian", "Seminar", "Pelatihan", "Kerjasama Akademik"],
  data: [160, 10, 60, 80, 90],
};

export default function Statistik() {
  const mapRef = useRef(null);
  const chartRef = useRef(null);
  const mitraChartRef = useRef(null);
  const kegiatanChartRef = useRef(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  // Load Leaflet
  useEffect(() => {
    const loadLeaflet = () => {
      if (typeof window === "undefined") return;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.body.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current || window.L === undefined) return;

      if (mapRef.current._leaflet_map) {
        mapRef.current._leaflet_map.remove();
      }

      const map = window.L.map(mapRef.current).setView([20, 0], 2);

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      mapRef.current._leaflet_map = map;

      markers.forEach((marker) => {
        const markerIcon = window.L.divIcon({
          className: "custom-marker",
          html: `<div class="w-4 h-4 bg-yellow-500 border-2 border-white rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const leafletMarker = window.L.marker([marker.lat, marker.lng], { icon: markerIcon }).addTo(map);
        leafletMarker.bindPopup(`
          <div class="p-2 text-sm font-medium">
            <p class="font-bold">${marker.name}</p>
            <p>MOA: ${marker.moa}</p>
            <p>MOU: ${marker.mou}</p>
            <p>IA: ${marker.ia}</p>
          </div>
        `);
      });
    };

    loadLeaflet();

    return () => {
      if (mapRef.current?._leaflet_map) {
        mapRef.current._leaflet_map.remove();
      }
    };
  }, []);

  // Load Chart.js & Render All Charts
useEffect(() => {
    if (typeof window === "undefined") return;
  
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = () => {
      // Line Chart: Pertumbuhan Kerjasama
      if (chartRef.current) {
        new window.Chart(chartRef.current.getContext("2d"), {
          type: "line",
          data: {
            labels: yearlyData.years,
            datasets: [
              {
                label: "MoU",
                data: yearlyData.MoU, 
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: "#3B82F6",
              },
              {
                label: "MoA",
                data: yearlyData.MoA, 
                borderColor: "#EF4444",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: "#EF4444",
              },
              {
                label: "IA",
                data: yearlyData.IA, 
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: "#10B981",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: "rgba(0, 0, 0, 0.1)" },
                ticks: { color: "#6b7280" },
              },
              x: {
                grid: { color: "rgba(0, 0, 0, 0.1)" },
                ticks: { color: "#6b7280" },
              },
            },
            plugins: {
              legend: { position: "bottom", labels: { color: "#6b7280", padding: 15 } },
              tooltip: { enabled: true },
            },
          },
        });
      }
  
      // Bar Chart: Klasifikasi Mitra (vertical)
      if (mitraChartRef.current) {
        new window.Chart(mitraChartRef.current.getContext("2d"), {
          type: "bar",
          data: {
            labels: mitraData.labels,
            datasets: [
              {
                data: mitraData.data, 
                backgroundColor: "#F59E0B",
                borderColor: "#D97706",
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: "x",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { color: "#6b7280" },
              },
              y: {
                grid: { color: "rgba(0,0,0,0.1)" },
                ticks: { color: "#6b7280" },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
            },
          },
        });
      }
  
      // Bar Chart: Bentuk Kegiatan (vertical)
      if (kegiatanChartRef.current) {
        new window.Chart(kegiatanChartRef.current.getContext("2d"), {
          type: "bar",
          data: {
            labels: kegiatanData.labels,
            datasets: [
              {
                data: kegiatanData.data, 
                backgroundColor: "#3B82F6",
                borderColor: "#2563EB",
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: "x",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { color: "#6b7280" },
              },
              y: {
                grid: { color: "rgba(0,0,0,0.1)" },
                ticks: { color: "#6b7280" },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
            },
          },
        });
      }
    };
  
    document.body.appendChild(script);
  
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">


      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#003366]">Statistik Kerja Sama Internasional</h2>
            <p className="mt-2 text-gray-700">Peta distribusi kerja sama antar institusi pendidikan tinggi.</p>
          </div>

          {/* 🗺️ Map Container */}
          <div
            ref={mapRef}
            className="w-full h-96 md:h-[500px] bg-gray-50 rounded-lg shadow-md mb-8"
            style={{ zIndex: 0 }}
          />

          {/* 📈 Line Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M22 12H2"></path>
                <path d="M12 2v20"></path>
                <path d="M18 6l-6 6-6-6"></path>
              </svg>
              Pertumbuhan Kerjasama
            </h3>
            <div className="w-full h-80 relative">
              <canvas ref={chartRef} className="w-full h-full" />
            </div>
          </div>

                    {/* 📊 Average Tahunan */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-blue-700 font-medium">AVG MoU</p>
              <p className="text-2xl font-bold text-blue-600">{avgMoU}/thn</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-sm text-red-700 font-medium">AVG MoA</p>
              <p className="text-2xl font-bold text-red-600">{avgMoA}/thn</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-green-700 font-medium">AVG IA</p>
              <p className="text-2xl font-bold text-green-600">{avgIA}/thn</p>
            </div>
          </div>

          {/* 📊 3 KOTAK SEJAJAR HORIZONTAL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Left: Top 10 Income Generate */}
                        <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
              <div 
                className="bg-[#003366] text-white px-4 py-2 text-center font-bold text-sm uppercase tracking-wide"
                style={{ color: "white", opacity: 1 }}
              >
                Top 10 Income Generate
              </div>
              <div className="p-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-1 px-2 text-left text-gray-700 font-medium">No.</th>
                      <th className="py-1 px-2 text-left text-gray-700 font-medium">Instansi</th>
                      <th className="py-1 px-2 text-right text-gray-700 font-medium">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeData.map((item) => (
                      <tr key={item.no} className="border-b border-gray-200">
                        <td className="py-1 px-2 text-gray-800 font-normal">{item.no}</td>
                        <td className="py-1 px-2 text-gray-800 font-normal">{item.instansi}</td>
                        <td className="py-1 px-2 text-gray-800 font-normal text-right">{item.jumlah.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 text-center text-xs text-gray-600">
                  <button className="text-blue-600 hover:underline">Overview →</button>
                </div>
              </div>
            </div>

            {/* Middle: Top 5 Klasifikasi Mitra */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#003366] text-white px-4 py-2 text-center font-bold text-sm uppercase tracking-wide">
                Top 5 Klasifikasi Mitra
              </div>
              <div className="p-4">
                <div className="w-full h-64 relative">
                  <canvas ref={mitraChartRef} className="w-full h-full" />
                </div>
              </div>
              <div className="mt-3 text-center text-xs text-gray-600">
                  <button className="text-blue-600 hover:underline">Overview →</button>
                </div>
            </div>

            {/* Right: Top 5 Bentuk Kegiatan */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#003366] text-white px-4 py-2 text-center font-bold text-sm uppercase tracking-wide">
                Top 5 Bentuk Kegiatan
              </div>
              <div className="p-4">
                <div className="w-full h-64 relative">
                  <canvas ref={kegiatanChartRef} className="w-full h-full" />
                </div>
              </div>
              <div className="mt-3 text-center text-xs text-gray-600">
                  <button className="text-blue-600 hover:underline">Overview →</button>
                </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

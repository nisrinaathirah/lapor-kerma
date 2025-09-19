"use client";

import { useState } from "react";

const faqData = [
  {
    question: "Apa itu Laporan Kerjasama Kemdikti?",
    answer:
      "Laporan Kerjasama Kemdikti adalah dokumen resmi yang digunakan untuk melaporkan kegiatan kerjasama antar perguruan tinggi atau lembaga terkait.",
  },
  {
    question: "Apa saja jenis bentuk kerjasama yang bisa dilaporkan?",
    answer:
      "Bentuk kerjasama bisa berupa penelitian bersama, pertukaran mahasiswa/dosen, pengabdian masyarakat, dan lain-lain.",
  },
  {
    question: "Bagaimana cara mengakses Laporan Kerjasama?",
    answer:
      "Laporan Kerjasama dapat diakses melalui portal resmi Kemdikti atau aplikasi yang disediakan oleh universitas/lembaga terkait.",
  },
  {
    question: "Siapa yang dapat mengajukan laporan kerjasama?",
    answer:
      "Pihak yang berwenang di perguruan tinggi atau lembaga yang memiliki kegiatan kerjasama dapat mengajukan laporan.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <div className="flex flex-col md:flex-row md:items-start md:gap-16 justify-center">
        {/* LEFT SIDE */}
        <div className="md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
          <h2 className="text-[28px] font-bold text-[#003366] mb-4">FAQ</h2>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-2/3 md:ml-auto max-w-2xl space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 font-semibold text-black"
                onClick={() => toggleIndex(index)}
              >
                {item.question}
                <span
                  className={`text-xl transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-600 border-t border-gray-200">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

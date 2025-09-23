"use client";

import React, { useState } from 'react';
import Link from "next/link";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu Laporan Kerjasama Kemdikti?",
      answer: "Laporan Kerjasama Kemdikti adalah dokumen resmi yang digunakan untuk melaporkan hasil kerja sama antara institusi pendidikan tinggi dengan pihak luar, baik dalam maupun luar negeri, sesuai dengan ketentuan yang ditetapkan oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek)."
    },
    {
      question: "Apa saja jenis bentuk kerjasama yang bisa dilaporkan?",
      answer: "Jenis kerjasama yang dapat dilaporkan meliputi: kerjasama akademik, penelitian, pengabdian kepada masyarakat, pertukaran mahasiswa/dosen, pelatihan, dan kerjasama teknologi. Semua bentuk kerjasama harus memenuhi syarat formalitas dan legalitas."
    },
    {
      question: "Bagaimana cara mengakses Laporan Kerjasama?",
      answer: "Anda dapat mengakses Laporan Kerjasama melalui portal resmi Kemdikti atau sistem informasi khusus yang disediakan oleh institusi pendidikan tinggi. Biasanya login dilakukan melalui akun SIAKAD atau Sistem Informasi Perguruan Tinggi (SIPPT)."
    },
    {
      question: "Siapa yang dapat mengajukan laporan kerjasama?",
      answer: "Laporan kerjasama dapat diajukan oleh dosen, tenaga kependidikan, atau pejabat institusi yang telah mendapatkan izin dari pimpinan perguruan tinggi dan telah menandatangani perjanjian kerjasama secara resmi."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Frequently Asked Question</h1>
        <p className="text-gray-600">
          Kami telah merangkum pertanyaan yang paling sering diajukan untuk membantu Anda menemukan jawaban dengan cepat dan mudah.
        </p>
        <hr className="my-6 border-gray-300" />
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-md overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              <span className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 py-4 text-gray-700 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Get in touch section */}
      <div className="max-w-4xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Still have questions?</h3>
          <p className="text-gray-600 text-sm mt-1">
            If you have other questions or need further information, don't hesitate to contact us.<br />
            We are here to help you!
          </p>
        </div>
        <button className="bg-[#003366] hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow transition-colors duration-200">
          Get in touch
        </button>
      </div>
    </div>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useEffect } from "react";

export default function Berita() {
  const beritaData = [
    {
      id: 1,
      title:
        "Mendikstaintek menghadiri Upacara Gelar Pasukan Operasional dan Kehormatan Militer di Batujajar Bandung",
      date: "10 Agustus 2025",
      image: "/berita1.webp",
    },
    {
      id: 2,
      title:
        "Mendikstaintek menghadiri Upacara Gelar Pasukan Operasional dan Kehormatan Militer di Batujajar Bandung",
      date: "10 Agustus 2025",
      image: "/berita2.webp",
    },
    {
      id: 3,
      title:
        "Mendikstaintek menghadiri Upacara Gelar Pasukan Operasional dan Kehormatan Militer di Batujajar Bandung",
      date: "10 Agustus 2025",
      image: "/berita3.webp",
    },
    {
      id: 4,
      title:
        "Berita tambahan contoh dengan judul lebih pendek",
      date: "12 Agustus 2025",
      image: "/berita4.jpg",
    },
  ];

  useEffect(() => {
    const prev = document.querySelector(".swiper-button-prev");
    const next = document.querySelector(".swiper-button-next");
    if (prev) prev.style.color = "white";
    if (next) next.style.color = "white";
  }, []);

  return (
    <section className="bg-white px-12 py-16">
      {/* Judul */}
      <h2 className="text-[28px] font-bold text-[#003366] mb-8 ml-8 px-4 md:px-0">
        Berita Terkini
      </h2>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        loop
        className="pb-12 pt-6"
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {beritaData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
              <div className="w-full h-[200px] md:h-[220px] lg:h-[250px] relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-auto">{item.date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

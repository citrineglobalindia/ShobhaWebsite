"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Camera,
  ImageIcon,
} from "lucide-react";

const galleryImages = [
  {
    id: 0,
    title: "Grand Bedroom",
    category: "Interior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463343/indoorbedroom_ykrltj.webp",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    id: 1,
    title: "Elegant Living",
    category: "Interior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463342/indoorhall_k0um5q.webp",
    size: "col-span-1",
  },
  {
    id: 2,
    title: "Minimal Lounge",
    category: "Interior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463342/indoor2_wjjxh3.webp",
    size: "col-span-1",
  },
  {
    id: 3,
    title: "Main Blueprint",
    category: "Layout",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463339/mainplan_v05icr.webp",
    size: "md:col-span-2",
  },
  {
    id: 4,
    title: "Modern Kitchen",
    category: "Interior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463338/kichenn_zkv09i.webp",
    size: "col-span-1",
  },
  {
    id: 5,
    title: "Dining Detail",
    category: "Interior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463337/indoorkitchen_ydtsoh.webp",
    size: "col-span-1",
  },
  {
    id: 6,
    title: "Master Suite",
    category: "Interior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463337/indoorbedroom2_crpqjk.webp",
    size: "md:row-span-2",
  },
  {
    id: 7,
    title: "The Emporium",
    category: "Exterior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463340/oneemporium_hhuira.webp",
    size: "col-span-1",
  },
  {
    id: 8,
    title: "Clubhouse Lounge",
    category: "Exterior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463340/clubHouse_khp3rw.webp",
    size: "md:col-span-2",
  },
  {
    id: 9,
    title: "Site Layout",
    category: "Layout",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463341/unitplans_c6krgv.webp",
    size: "col-span-1",
  },
  {
    id: 10,
    title: "Main Entrance",
    category: "Exterior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463339/mainent_knj6l7.webp",
    size: "col-span-1",
  },
  {
    id: 11,
    title: "Project Area",
    category: "Layout",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463338/area_gfjbix.webp",
    size: "col-span-1",
  },
  {
    id: 12,
    title: "Interior Focus",
    category: "Interior",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463338/indoor4_naxhv4.webp",
    size: "col-span-1",
  },
];

const GallerySectionOne = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Interior", "Exterior", "Layout"];
  const filteredImages =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const handleNext = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    },
    [filteredImages.length],
  );

  const handlePrev = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrentIndex(
        (prev) => (prev - 1 + filteredImages.length) % filteredImages.length,
      );
    },
    [filteredImages.length],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setCurrentIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, handleNext, handlePrev]);

  return (
    <section className="relative w-full py-16 bg-white min-h-screen select-none">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        {/* Modern Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <Camera className="w-5 h-5 text-[#8a6d1d]" />
              <span className="text-[#8a6d1d] uppercase tracking-[0.4em] text-[10px] font-black">
                Architecture Gallery
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#0a0806]">
              Visual <span className="italic font-light">Journey</span>
            </h2>
          </motion.div>

          {/* Filtering System */}
          <div className="flex flex-wrap justify-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  filter === cat
                    ? "bg-white text-[#8a6d1d] shadow-sm scale-105"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] gap-3 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`relative group cursor-pointer overflow-hidden rounded-3xl bg-gray-50 ${image.size}`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Visual Hover State */}
                <div className="absolute inset-0 bg-[#0a0806]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                  <div className="p-3 bg-white rounded-full mb-3 scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-5 h-5 text-black" />
                  </div>
                  <p className="text-white text-[9px] uppercase tracking-widest font-bold">
                    {image.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Advanced Lightbox with Sliding Navigation */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/98 backdrop-blur-2xl flex items-center justify-center select-none"
            onClick={() => setCurrentIndex(null)}
          >
            {/* UI Controls */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-[210]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center rounded-full">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                  {currentIndex + 1}{" "}
                  <span className="text-gray-300 mx-1">/</span>{" "}
                  {filteredImages.length}
                </span>
              </div>
              <button
                onClick={() => setCurrentIndex(null)}
                className="p-4 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-6 md:left-10 p-5 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-black hover:text-white transition-all z-[210]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 md:right-10 p-5 rounded-full bg-white border border-gray-100 shadow-xl hover:bg-black hover:text-white transition-all z-[210]"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Sliding Image Area */}
            <div className="relative w-full max-w-6xl h-[70vh] px-4 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredImages[currentIndex].id}
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={filteredImages[currentIndex].url}
                    alt="Gallery Detail"
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl bg-gray-50"
                  />

                  {/* Meta Data */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                  >
                    <span className="text-[#8a6d1d] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
                      {filteredImages[currentIndex].category}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-serif text-black">
                      {filteredImages[currentIndex].title}
                    </h3>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Helper Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-300 text-[9px] uppercase tracking-widest font-bold">
              Use Arrow Keys to Navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySectionOne;

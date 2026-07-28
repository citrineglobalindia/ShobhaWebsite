"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Home,
  Trees,
} from "lucide-react";

// --- 1. DATA CONFIGURATION ---
// Based on your screenshot.
// TIP: Ensure these images exist in your public/images/altair/ folder.
const GALLERY_DATA = [
  {
    id: 1,
    title: "Neopolis Facade",
    category: "Exteriors",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454555/main_1_hutnjm.jpg", // Make sure this file exists
    size: "large", // Spans 2x2 on desktop
  },
  {
    id: 2,
    title: "Master Bedroom",
    category: "Interiors",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454545/Master-Bedroom_euwqzj.jpg",
    size: "normal",
  },
  {
    id: 3,
    title: "Grand Lobby",
    category: "Interiors",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454552/Lobby_xqhovk.jpg",
    size: "normal",
  },
  {
    id: 4,
    title: "Luxury Living Room",
    category: "Interiors",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454552/Living-Room_jqgxbq.jpg",
    size: "wide", // Spans 2 cols
  },
  {
    id: 5,
    title: "Elevation View",
    category: "Exteriors",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454549/Elevation-Evening-View-1_t8sxsw.jpg",
    size: "tall", // Spans 2 rows
  },
  {
    id: 6,
    title: "Evening Ambience",
    category: "Exteriors",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454552/Living-Room_jqgxbq.jpg",
    size: "tall",
  },
  {
    id: 7,
    title: "Dining Area",
    category: "Interiors",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454547/Dining-Room_xkoioi.jpg",
    size: "normal",
  },
  {
    id: 8,
    title: "Balcony Deck",
    category: "Exteriors",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454546/Balcony_w0v5sp.jpg",
    size: "normal",
  },
];

const CATEGORIES = [
  { label: "All Photos", value: "All", icon: LayoutGrid },
  { label: "Interiors", value: "Interiors", icon: Home },
  { label: "Exteriors", value: "Exteriors", icon: Trees },
];

const AltairGallery = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Filter Logic
  const filteredImages =
    filter === "All"
      ? GALLERY_DATA
      : GALLERY_DATA.filter((img) => img.category === filter);

  // Lightbox Navigation Logic
  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
  };

  // Keyboard support for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <section className="mb-12 bg-white font-sans" id="gallery">
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        {/* --- HEADER & FILTERS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="text-center md:text-left">
            <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em] block mb-2">
              Visual Tour
            </span>
            <h2 className="text-4xl font-bold text-[#0a1e38]">
              Sobha Altair Gallery
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100 rounded-full">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = filter === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
                    ${
                      isActive
                        ? "bg-[#0a1e38] text-white shadow-lg"
                        : "text-gray-500 hover:text-[#0a1e38] hover:bg-gray-200"
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- SMART GRID --- */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => {
              // Only apply bento spans when viewing "All".
              // When filtered, use a standard grid for neatness.
              const isAll = filter === "All";

              return (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`
                    relative group cursor-pointer overflow-hidden rounded-xl bg-gray-200
                    ${
                      isAll && img.size === "large"
                        ? "lg:col-span-2 lg:row-span-2"
                        : ""
                    }
                    ${isAll && img.size === "wide" ? "lg:col-span-2" : ""}
                    ${isAll && img.size === "tall" ? "lg:row-span-2" : ""}
                  `}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.category}
                    </span>
                    <div className="flex justify-between items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <h3 className="text-white font-bold text-lg">
                        {img.title}
                      </h3>
                      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <Expand className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)} // Close on background click
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-[#C5A059] rounded-full text-white transition-colors z-50 hidden md:block"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-[#C5A059] rounded-full text-white transition-colors z-50 hidden md:block"
              onClick={handleNext}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={selectedImageIndex} // Re-animate when index changes
              className="relative w-full max-w-5xl aspect-video md:aspect-[16/9] rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
              <Image
                src={filteredImages[selectedImageIndex].src}
                alt={filteredImages[selectedImageIndex].title}
                fill
                className="object-contain"
                priority
              />

              {/* Image Info Footer */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-bold">
                  {filteredImages[selectedImageIndex].title}
                </h3>
                <p className="text-sm text-gray-300">
                  {filteredImages[selectedImageIndex].category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AltairGallery;

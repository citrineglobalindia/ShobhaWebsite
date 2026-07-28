"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// --- IMAGE DATA (Mapped to resemble your screenshot) ---
const GALLERY_IMAGES = [
  {
    id: 1,
    category: "Exterior",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616560/1_lzvd66.jpg",
    alt: "Tower Exterior",
  },
  {
    id: 2,
    category: "Landscape",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616560/2_qibqyb.jpg",
    alt: "Aerial Park View",
  },
  {
    id: 3,
    category: "Amenities",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616560/3_gimuva.jpg",
    alt: "Clubhouse Exterior",
  },
  {
    id: 4,
    category: "Landscape",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616559/4_gyzrgu.jpg",
    alt: "Water Body Feature",
  },
  {
    id: 5,
    category: "Amenities",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616562/5_m84zlo.jpg",
    alt: "Swimming Pool",
  },
  {
    id: 6,
    category: "Interior",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616561/6_tyjk3w.jpg",
    alt: "Master Bedroom",
  },
  {
    id: 7,
    category: "Interior",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616561/7_s7eenn.jpg",
    alt: "Luxury Bathroom",
  },
  {
    id: 8,
    category: "Interior",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616561/8_xma1jf.jpg",
    alt: "Modern Kitchen",
  },
  {
    id: 9,
    category: "Interior",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616564/9_ht73sm.jpg",
    alt: "Living Room",
  },
  {
    id: 10,
    category: "Amenities",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616560/10_qiai3a.jpg",
    alt: "Garden Pool",
  },
  {
    id: 11,
    category: "Landscape",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616561/11_douw5q.jpg",
    alt: "Walking Path",
  },
];

const CATEGORIES = ["All", "Exterior", "Interior", "Amenities", "Landscape"];

const ProjectGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter Logic
  const filteredImages =
    activeCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  // Handlers
  const openModal = (index) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length,
    );
  };

  return (
    <section className="py-12 bg-white font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-4 md:px-6 lg:px-12 xl:px-12 2xl:px-12">
        {/* --- HEADER & FILTERS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em] block mb-2">
              Visual Tour
            </span>
            <h2 className="text-4xl font-bold text-slate-900">
              Project Gallery
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all
                  ${
                    activeCategory === cat
                      ? "bg-[#0a1e38] text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- GALLERY GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`relative group overflow-hidden rounded-xl cursor-pointer bg-slate-100
                  ${
                    index === 0
                      ? "lg:col-span-2 lg:row-span-2 h-[300px] lg:h-[616px]"
                      : "h-[300px]"
                  }
                `}
                onClick={() => openModal(index)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={closeModal}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50">
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-[#C5A059] rounded-full text-white transition-colors z-50 hidden md:block"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-[#C5A059] rounded-full text-white transition-colors z-50 hidden md:block"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[selectedImageIndex].src}
                alt={filteredImages[selectedImageIndex].alt}
                fill
                className="object-contain"
              />

              {/* Caption */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-medium">
                {filteredImages[selectedImageIndex].alt} (
                {selectedImageIndex + 1}/{filteredImages.length})
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectGallery;

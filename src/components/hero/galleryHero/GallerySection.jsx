"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, ArrowUpRight } from "lucide-react";

// --- GALLERY DATA ---
// Mixing the Sobha images you provided with high-quality interiors for a complete look
const GALLERY_ITEMS = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442585/ayna_rgsfz3.jpg",
    category: "Exteriors",
    title: "Grand Entrance",
    project: "Sobha Ayana",
    size: "large", // Spans 2 cols, 2 rows
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg",
    category: "Exteriors",
    title: "Skyline Marvel",
    project: "Sobha Altair",
    size: "tall", // Spans 1 col, 2 rows
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2664&auto=format&fit=crop",
    category: "Interiors",
    title: "Master Suite",
    project: "Sobha Town Park",
    size: "normal",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/hoskote_cxdrzp.jpg",
    category: "Exteriors",
    title: "Lush Landscapes",
    project: "Sobha One World",
    size: "normal",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
    category: "Interiors",
    title: "Premium Living",
    project: "Sobha Neopolis",
    size: "wide", // Spans 2 cols, 1 row
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/townpark_gydga7.jpg",
    category: "Exteriors",
    title: "Manhattan Towers",
    project: "Sobha Town Park",
    size: "normal",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    category: "Interiors",
    title: "Gourmet Kitchen",
    project: "Sobha Galera",
    size: "normal",
  },
];

const CATEGORIES = ["All", "Exteriors", "Interiors"];

const GallerySection = () => {
  const [filter, setFilter] = useState("All");

  // Filter Logic
  const filteredItems =
    filter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section className="py-12 bg-white font-sans">
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-3 block">
              Visual Tour
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-[#0a1e38] mb-4">
              Life at Sobha
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Explore our curated gallery showcasing the architectural
              brilliance, lush landscapes, and premium interiors that define the
              Sobha lifestyle.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xs text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                  filter === cat
                    ? "bg-[#0a1e38] text-white border-[#0a1e38]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#C5A059] hover:text-[#C5A059]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- BENTO GRID --- */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`
                  relative group overflow-hidden rounded-xs cursor-pointer
                  ${item.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
                  ${item.size === "tall" ? "md:col-span-1 md:row-span-2" : ""}
                  ${item.size === "wide" ? "md:col-span-2 md:row-span-1" : ""}
                  ${item.size === "normal" ? "md:col-span-1 md:row-span-1" : ""}
                `}
              >
                {/* Image */}
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay (Gradient) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content Reveal */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest mb-1">
                    {item.project}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-xl font-bold">
                      {item.title}
                    </h3>
                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#C5A059] hover:text-black transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Corner Icon (Zoom) */}
                <div className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <Expand className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0a1e38] hover:text-[#C5A059] transition-colors group">
            View All Photos
            <span className="w-8 h-[1px] bg-[#0a1e38] group-hover:w-12 group-hover:bg-[#C5A059] transition-all duration-300"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

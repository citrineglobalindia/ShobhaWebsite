"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const autoSliderImages = [
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779472483/site_t9ofeg.webp",
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463340/clubHouse_khp3rw.webp",
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463341/unitplans_c6krgv.webp",
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463339/mainplan_v05icr.webp",
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463339/mainent_knj6l7.webp",
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463338/area_gfjbix.webp",
];

const AutoGallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % autoSliderImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + autoSliderImages.length) % autoSliderImages.length,
    );
  }, []);

  // Automatic transition every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-screen h-[100svh] bg-[#050505] overflow-hidden group">
      {/* 1. MAIN IMAGE DISPLAY (WITH KEN BURNS EFFECT) */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              animate={{ scale: [1, 1.1] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
              }}
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${autoSliderImages[currentIndex]})`,
              }}
            />
            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. TOP DECOR: LOGO / BADGE (Optional) */}
      <div className="absolute top-10 left-10 z-20">
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
          <Maximize2 className="w-4 h-4 text-[#d4af37]" />
          <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">
            Immersive View
          </span>
        </div>
      </div>

      {/* 3. BOTTOM RIGHT NAVIGATION CLUSTER */}
      <div className="absolute bottom-10 right-6 md:right-12 z-30 flex items-end gap-8">
        {/* Fractional Indicator */}
        <div className="flex flex-col items-end mb-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-6xl font-serif text-[#d4af37]">
              0{currentIndex + 1}
            </span>
            <span className="text-white/30 font-light text-xl">
              / 0{autoSliderImages.length}
            </span>
          </div>
          <div className="h-[1px] w-24 bg-white/10 mt-2 relative overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute inset-0 bg-[#d4af37]"
            />
          </div>
        </div>

        {/* Arrow Controls */}
        <div className="flex bg-[#050505]/40 backdrop-blur-xl border border-white/10 rounded-sm">
          <button
            onClick={prevSlide}
            className="p-5 hover:bg-[#d4af37] hover:text-black text-white transition-all duration-500 border-r border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-5 hover:bg-[#d4af37] hover:text-black text-white transition-all duration-500"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 4. LAYER: SUBTLE GRAIN TEXTURE */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* 5. BOTTOM PROGRESS LINE (FULL WIDTH) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-40">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-[#d4af37]/60"
        />
      </div>

      {/* Edge Fog for Depth */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
    </section>
  );
};

export default AutoGallerySlider;

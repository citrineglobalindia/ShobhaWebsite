"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Home } from "lucide-react";

const interiorImages = [
  {
    id: 1,
    title: "Grand Bedroom",
    category: "Master Suite",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463343/indoorbedroom_ykrltj.webp",
  },
  {
    id: 2,
    title: "Elegant Living",
    category: "Social Space",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463342/indoorhall_k0um5q.webp",
  },
  {
    id: 3,
    title: "Minimal Lounge",
    category: "Relaxation",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463342/indoor2_wjjxh3.webp",
  },
  {
    id: 4,
    title: "Modern Kitchen",
    category: "Culinary Art",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463338/kichenn_zkv09i.webp",
  },
  {
    id: 5,
    title: "Dining Detail",
    category: "Fine Dining",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463337/indoorkitchen_ydtsoh.webp",
  },
  {
    id: 6,
    title: "Master Suite",
    category: "Private Wing",
    url: "https://res.cloudinary.com/djxsxevds/image/upload/v1779463337/indoorbedroom2_crpqjk.webp",
  },
];

const sliderVariants = {
  incoming: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    scale: 0.8,
    opacity: 0,
  }),
};

const InteriorSliderSection = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex = Math.abs(page % interiorImages.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content Side (Stays Static but text animates) */}
          <div className="w-full lg:w-2/5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 text-[#8a6d1d]" />
                <span className="text-[#8a6d1d] uppercase tracking-[0.4em] text-[10px] font-black">
                  Indoor Curation
                </span>
              </div>

              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                  >
                    <h2 className="text-4xl md:text-6xl font-serif text-[#0a0806] leading-tight">
                      {interiorImages[activeIndex].title}
                    </h2>
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm">
                Each room is a canvas of sophistication, featuring hand-picked
                finishes, Italian marble, and panoramic floor-to-ceiling vistas.
              </p>

              {/* Progress and Nav */}
              <div className="pt-8 flex items-center gap-10">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => paginate(-1)}
                    className="p-4 rounded-full border border-gray-100 hover:bg-black hover:text-white transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="p-4 rounded-full border border-gray-100 hover:bg-black hover:text-white transition-all shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col">
                  <span className="text-2xl font-serif text-black">
                    0{activeIndex + 1} <span className="text-gray-200">/</span>{" "}
                    0{interiorImages.length}
                  </span>
                  {/* Visual Progress Bar */}
                  <div className="w-24 h-[2px] bg-gray-100 mt-2 relative">
                    <motion.div
                      animate={{
                        width: `${((activeIndex + 1) / interiorImages.length) * 100}%`,
                      }}
                      className="absolute top-0 left-0 h-full bg-[#8a6d1d]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Slider Side (Half Section Feature) */}
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[2rem] shadow-2xl bg-gray-50">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={page}
                  custom={direction}
                  variants={sliderVariants}
                  initial="incoming"
                  animate="active"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.8 },
                  }}
                  src={interiorImages[activeIndex].url}
                  className="absolute inset-0 w-full h-full object-cover shadow-inner"
                  alt={interiorImages[activeIndex].title}
                />
              </AnimatePresence>

              {/* Decorative Corner Element */}
              <div className="absolute top-8 right-8 z-20">
                <div className="bg-white/20 backdrop-blur-xl p-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition-all cursor-pointer">
                  <Maximize2 className="w-5 h-5 text-white mix-blend-difference" />
                </div>
              </div>

              {/* Floating Category Label */}
              <div className="absolute bottom-8 left-8 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">
                      {interiorImages[activeIndex].category}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorSliderSection;

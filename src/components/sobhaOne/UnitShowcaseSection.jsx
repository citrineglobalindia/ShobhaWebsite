"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const units = [
  {
    id: "4bhk",
    name: "4 BHK Grande",
    area: "2,415 sq. ft.",
    desc: "Spacious luxury designed for grand living with panoramic views.",
    image:
      "https://res.cloudinary.com/djxsxevds/image/upload/v1779463340/clubHouse_khp3rw.webp",
  },
  {
    id: "3bhk",
    name: "3 BHK Luxe",
    area: "1,510 sq. ft.",
    desc: "A perfect balance of contemporary elegance and functional space.",
    image:
      "https://res.cloudinary.com/djxsxevds/image/upload/v1779463342/indoor2_wjjxh3.webp",
  },
  {
    id: "2bhk",
    name: "2 BHK Grande",
    area: "1,204 sq. ft.",
    desc: "Modern compact living without compromising on sophisticated design.",
    image:
      "https://res.cloudinary.com/djxsxevds/image/upload/v1779463342/indoorhall_k0um5q.webp",
  },
];

const UnitShowcase = () => {
  const [activeUnit, setActiveUnit] = useState(units[0]);
  const [index, setIndex] = useState(0);

  // Auto-changing implementation (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % units.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Sync active unit with index
  useEffect(() => {
    setActiveUnit(units[index]);
  }, [index]);

  return (
    <section className="relative w-full py-16 bg-[#ffffff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-semibold">
              Residences
            </p>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#110f0d]">
            Sophisticated Living
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Tabs Navigation */}
          <div className="flex flex-col gap-4">
            {units.map((unit, idx) => (
              <button
                key={unit.id}
                onClick={() => {
                  setActiveUnit(unit);
                  setIndex(idx);
                }}
                className={`group p-6 text-left rounded-xl transition-all duration-500 border ${
                  activeUnit.id === unit.id
                    ? "bg-[#faf9f7] border-[#d4af37]/50 shadow-md"
                    : "bg-transparent border-transparent hover:bg-[#faf9f7] hover:border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={`text-xl font-medium transition-colors ${activeUnit.id === unit.id ? "text-[#d4af37]" : "text-[#110f0d]"}`}
                  >
                    {unit.name}
                  </h3>
                  {activeUnit.id === unit.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"
                    />
                  )}
                </div>
                <p className="text-[#d4af37] text-xs font-semibold mb-2 tracking-widest uppercase">
                  {unit.area}
                </p>
                <p className="text-gray-500 text-sm font-light">{unit.desc}</p>
              </button>
            ))}
          </div>

          {/* Dynamic Image Display */}
          <div className="relative h-[550px] w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeUnit.id}
                src={activeUnit.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
                alt={activeUnit.name}
              />
            </AnimatePresence>

            {/* Elegant overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#110f0d]/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-[#d4af37] text-xs uppercase tracking-[0.2em] font-semibold mb-1">
                Selected Plan
              </p>
              <span className="text-white text-3xl font-serif">
                {activeUnit.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnitShowcase;

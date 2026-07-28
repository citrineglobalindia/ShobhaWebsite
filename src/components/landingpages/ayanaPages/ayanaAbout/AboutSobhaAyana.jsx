"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Building2,
  MapPin,
  Calendar,
  Layers,
  Trees,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

// --- DATA ---
const PROJECT_STATS = [
  {
    label: "Land Parcel",
    value: "6.29 Acres",
    sub: "Lush Greenery",
    icon: Trees,
  },
  { label: "Towers", value: "12 Wings", sub: "G + 14 Floors", icon: Building2 },
  { label: "Total Units", value: "683", sub: "Exclusive Homes", icon: Layers },
  {
    label: "Configuration",
    value: "3 BHK",
    sub: "1553 Sq.ft+",
    icon: ArrowUpRight,
  },
  {
    label: "Possession",
    value: "Dec 2031",
    sub: "Under Construction",
    icon: Calendar,
  },
  {
    label: "Developer",
    value: "Sobha Group",
    sub: "Premium Legacy",
    icon: CheckCircle2,
  },
];

const AMENITIES_HIGHLIGHT = [
  "Skating Rink",
  "Wave Garden",
  "Bamboo Trek",
  "Adventure Trail",
];

const AboutSobhaAyana = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects (Disabled on mobile by default via media queries or kept subtle)
  const yImage = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8], [0, 1, 1]);

  return (
    <section
      ref={containerRef}
      className="relative py-12 md:py-16 lg:py-24 bg-white font-sans overflow-hidden"
      id="about"
    >
      {/* --- BACKGROUND ACCENTS --- */}
      {/* Hidden on mobile to improve performance and reduce visual noise */}
      <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* --- CONTENT NARRATIVE (Order 1 on Mobile, Order 2 on Desktop) --- */}
          {/* Text first on mobile makes for better reading flow */}
          <motion.div
            style={{ opacity: opacityText }}
            className="space-y-6 md:space-y-8 order-1 lg:order-2"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <span className="w-8 md:w-12 h-[3px] bg-[#C5A059]"></span>
                <span className="text-[#C5A059] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em]">
                  Project Overview
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#0a1e38] leading-tight">
                Sobha <span className="text-[#C5A059]">Ayana</span>
              </h2>
              <div className="flex items-center gap-2 text-gray-500 mt-2 md:mt-3 text-xs md:text-sm font-medium">
                <MapPin className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-[#C5A059]" />
                Panathur, East Bangalore
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed text-justify">
              <p>
                Spread across{" "}
                <strong className="text-[#0a1e38]">6.29 acres</strong>, Sobha
                Ayana is a luxury enclave featuring 12 elegant wings crafted to
                combine everyday comfort with a touch of opulence. With homes
                starting from{" "}
                <strong className="text-[#0a1e38]">1553 sq. ft.</strong>, every
                unit is designed to maximize space and natural light.
              </p>
              <p>
                More than just a home, it offers a resort-like lifestyle with
                unique amenities like a
                <span className="text-[#C5A059] font-semibold">
                  {" "}
                  Wave Garden, Bamboo Trek, and Adventure Trail
                </span>
                , set within lush green landscapes.
              </p>
            </div>

            {/* Unique Amenities Tags */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {AMENITIES_HIGHLIGHT.map((amenity, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-full text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-wider"
                >
                  {amenity}
                </span>
              ))}
            </div>

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
              {PROJECT_STATS.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white border border-gray-100 p-3 md:p-5 rounded-lg md:rounded-xl shadow-sm hover:shadow-xl hover:border-[#C5A059]/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-[#C5A059] transition-colors" />
                      <span className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                        {stat.label}
                      </span>
                    </div>
                    <h4 className="text-sm md:text-lg font-bold text-[#0a1e38] group-hover:text-[#C5A059] transition-colors truncate">
                      {stat.value}
                    </h4>
                    <p className="text-[9px] md:text-[10px] text-gray-500 mt-0.5 md:mt-1 truncate">
                      {stat.sub}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Investment Note */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 md:p-5 rounded-r-xl">
              <p className="text-[11px] md:text-xs text-gray-700 leading-relaxed">
                <strong className="text-[#0a1e38] block mb-1 text-xs md:text-sm">
                  Smart Investment Opportunity
                </strong>
                Located near{" "}
                <span className="font-semibold text-emerald-800">
                  New Horizon Gurukul & MG Road
                </span>
                , Sobha Ayana guarantees strong appreciation backed by Sobha
                Group’s legacy.
              </p>
            </div>
          </motion.div>

          {/* --- RIGHT: VISUAL SHOWCASE (Order 2 on Mobile, Order 1 on Desktop) --- */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[650px] w-full order-2 lg:order-1 group mt-8 lg:mt-0">
            {/* Main Parallax Container */}
            <motion.div
              style={{ y: yImage }}
              className="absolute inset-0 z-10 rounded-2xl md:rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl"
            >
              <Image
                src="https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769458410/entrence_iapzvc.webp"
                alt="Sobha Ayana Grand Entrance"
                fill
                className="object-cover transition-transform duration-[2s] scale-110 group-hover:scale-100"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />

              {/* Floating Status Badge */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-xl border border-white/50 p-3 md:p-5 rounded-lg md:rounded-xl shadow-lg">
                <p className="text-[#0a1e38] text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 md:mb-1">
                  Current Status
                </p>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[#0a1e38] font-bold text-sm md:text-lg">
                    Under Construction
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Decorative Outline Behind (Gold) */}
            <div className="absolute inset-0 border-2 border-[#C5A059]/20 rounded-2xl md:rounded-[2rem] translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSobhaAyana;

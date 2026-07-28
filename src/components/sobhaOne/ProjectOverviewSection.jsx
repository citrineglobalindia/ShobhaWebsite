"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Maximize,
  Home,
  Building2,
  Layers,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";

const ProjectOverviewSection = () => {
  // Advanced cinematic entrance animations
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  // Continuous subtle float animation for the glass card
  const floatAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    // Premium Pearl/Off-White Background
    <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#fdfcfb] overflow-hidden selection:bg-[#d4af37] selection:text-white">
      {/* Advanced Responsive Ambient Glows */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] xl:w-[800px] h-[300px] md:h-[600px] xl:h-[800px] bg-gradient-to-bl from-[#d4af37]/[0.07] to-transparent rounded-full blur-[80px] md:blur-[120px] pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] xl:w-[700px] h-[300px] md:h-[500px] xl:h-[700px] bg-gradient-to-tr from-[#e8e4db] to-transparent rounded-full blur-[80px] md:blur-[120px] pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 xl:gap-20 items-center">
          {/* Left Column: Architectural Image Setup */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="relative lg:col-span-5 w-full h-[400px] sm:h-[500px] lg:h-[700px] xl:h-[750px] rounded-2xl group mt-8 lg:mt-0"
          >
            {/* Architectural Offset Frame (Background shadow box) */}
            <div className="absolute -inset-3 sm:-inset-4 border border-[#d4af37]/20 rounded-3xl translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none" />

            {/* Main Image Container */}
            <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] ring-1 ring-black/5 z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

              <img
                src="https://res.cloudinary.com/djxsxevds/image/upload/v1779463341/unitplans_c6krgv.webp"
                alt="Sobha One World Master Plan"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out"
              />
            </div>

            {/* Premium Floating Glassmorphism Element */}
            <motion.div
              animate={floatAnimation}
              className="absolute -bottom-10 sm:-bottom-12 right-2 sm:-right-8 lg:-right-16 z-20 bg-white/80 backdrop-blur-3xl border border-white p-5 sm:p-6 lg:p-8 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] w-[calc(100%-1rem)] sm:w-[320px] lg:w-[360px] group-hover:shadow-[0_30px_50px_-10px_rgba(212,175,55,0.2)] transition-shadow duration-700"
            >
              <div className="flex items-center gap-3 mb-3 lg:mb-4">
                <span className="w-6 lg:w-8 h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent"></span>
                <p className="text-[#d4af37] text-[9px] lg:text-[10px] font-bold tracking-[0.3em] uppercase">
                  Prime Location
                </p>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#110f0d] mb-2 lg:mb-3 tracking-wide">
                Hoskote,{" "}
                <span className="text-lg sm:text-xl lg:text-2xl font-sans text-gray-400 font-light">
                  Bangalore
                </span>
              </h3>
              <p className="text-gray-500 text-[11px] sm:text-xs lg:text-sm leading-relaxed font-light">
                A fast-growing hub presenting excellent growth potential and an
                attractive opportunity for true visionaries.
              </p>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-bl from-[#d4af37]/20 to-transparent rounded-tr-2xl pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Right Column: Content & Features */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col justify-center lg:pl-8 xl:pl-16 mt-20 sm:mt-24 lg:mt-0 lg:col-span-7"
          >
            {/* Section Header */}
            <motion.div
              variants={fadeUpVariant}
              className="flex items-center space-x-3 mb-5"
            >
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <p className="text-[#d4af37] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] lg:text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Grand
                Integrated Township
              </p>
            </motion.div>

            {/* Grand Headline */}
            <motion.h2
              variants={fadeUpVariant}
              className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-serif font-light text-[#110f0d] leading-[1.15] mb-5"
            >
              SOBHA <br className="hidden sm:block" />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#110f0d] via-[#4a3e1a] to-[#d4af37]">
                ONE WORLD
              </span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              variants={fadeUpVariant}
              className="text-gray-600 text-[13px] sm:text-sm lg:text-base xl:text-lg font-light leading-relaxed mb-10 max-w-2xl"
            >
              Experience a new era of urban living at SOBHA One World at
              Hoskote. Designed as a premium mixed-use community, this landmark
              development features 1, 2, 3 & 4 BHK modern residences.
              Thoughtfully planned with expansive open spaces and future-ready
              infrastructure.
            </motion.p>

            {/* Advanced 2-Column Stats Grid (Forces 2 cols on all screens) */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-10 max-w-3xl"
            >
              {[
                { icon: Maximize, title: "45 Acres", desc: "Land Parcel" },
                { icon: Home, title: "4,182", desc: "Premium Units" },
                { icon: Building2, title: "08 Towers", desc: "Landmarks" },
                { icon: Layers, title: "G + 54", desc: "Floors / Tower" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUpVariant}
                  // padding is dramatically scaled for mobile (p-3) to desktop (p-6)
                  className="group relative flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 sm:p-5 lg:p-6 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-[#d4af37]/50 transition-all duration-500 overflow-hidden cursor-default"
                >
                  {/* Hover Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent pointer-events-none" />

                  {/* Dynamic Icon Container */}
                  <div className="relative flex-shrink-0 p-2.5 sm:p-3 rounded-xl bg-[#fdfbf7] border border-[#d4af37]/20 text-[#d4af37] group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500 shadow-sm z-10">
                    <stat.icon
                      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Dynamic Typography */}
                  <div className="relative z-10">
                    <h4 className="text-[#110f0d] font-serif font-medium text-base sm:text-lg lg:text-xl xl:text-2xl mb-0.5 sm:mb-1 tracking-wide group-hover:text-[#d4af37] transition-colors duration-300 whitespace-nowrap">
                      {stat.title}
                    </h4>
                    <p className="text-gray-500 text-[9px] sm:text-[10px] lg:text-[11px] leading-tight font-medium uppercase tracking-[0.15em] sm:tracking-widest">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium Action Link */}
            <motion.div variants={fadeUpVariant}>
              <a
                href="#enquire-now"
                className="group relative inline-flex items-center justify-center sm:justify-start space-x-3 text-[#d4af37] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs lg:text-sm py-3.5 px-6 sm:px-8 bg-white border border-[#d4af37]/30 rounded-full hover:bg-[#d4af37] hover:text-white transition-all duration-500 shadow-[0_8px_20px_-6px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_25px_-6px_rgba(212,175,55,0.4)] overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10">Enquire Pre-Launch Offers</span>
                <ArrowRight className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-500" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverviewSection;

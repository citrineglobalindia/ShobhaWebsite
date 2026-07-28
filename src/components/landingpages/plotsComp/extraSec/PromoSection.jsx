"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ruler,
  Tag,
  MapPin,
  X,
  ArrowUpRight,
  Sparkles,
  Flower,
  Droplets,
} from "lucide-react";

// --- DATA CONFIGURATION ---
const GALLERY_ITEMS = [
  {
    id: 1,
    type: "amenity",
    label: "Mysore Palace Proximity",
    desc: "15 Mins from Royal Heritage",
    src: "https://res.cloudinary.com/djxsxevds/image/upload/v1783603533/palace_xk3y2j.jpg",
  },
  {
    id: 2,
    type: "nature",
    label: "Brindavan-Inspired Gardens",
    desc: "Lush botanical escapes",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775667533/5_opora9.jpg",
  },
  {
    id: 3,
    type: "layout",
    label: "Vaastu Compliant Plots",
    desc: "Perfectly aligned for prosperity",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775667528/4_advgdb.jpg",
  },
  {
    id: 4,
    type: "amenity",
    label: "Olympic-Size Pool",
    desc: "Resort-style aquatic luxury",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775667874/shobaimg_1_wokedj.jpg",
  },
  {
    id: 5,
    type: "layout",
    label: "Wide Internal Roads",
    desc: "Seamless intra-community transit",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775667528/7_gox0mx.jpg",
  },
  {
    id: 6,
    type: "nature",
    label: "Chamundi Hill Views",
    desc: "Wake up to serene vistas",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775668020/shobaimg_2_kuy9sx.jpg",
  },
  {
    id: 7,
    type: "amenity",
    label: "State-of-the-Art Gym",
    desc: "Premium fitness equipment",
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    type: "layout",
    label: "13-Acre Masterplan",
    desc: "Low-density exclusive living",
    src: "https://res.cloudinary.com/djxsxevds/image/upload/v1783603535/streetlight_o7yudn.jpg",
  },
  {
    id: 9,
    type: "amenity",
    label: "Luxury Clubhouse",
    desc: "State-of-the-art recreational center",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775667528/6_jn3aga.jpg",
  },
  {
    id: 10,
    type: "garden",
    label: "Curated Themed Gardens",
    desc: "Serene walking trails",
    src: "https://res.cloudinary.com/djxsxevds/image/upload/v1783603545/roads_yify28.jpg",
  },
  {
    id: 11,
    type: "drainage",
    label: "Advanced Drainage System",
    desc: "Underground utility management",
    src: "https://res.cloudinary.com/djxsxevds/image/upload/v1783603537/drinage_coj5bt.jpg",
  },
  {
    id: 12,
    type: "garden",
    label: "Sandalwood Groves",
    desc: "Authentic Mysuru landscaping",
    src: "https://res.cloudinary.com/djxsxevds/image/upload/v1783603532/plots_i1dfxp.jpg",
  },
];

// Added new mapped icons to prevent undefined crashes
const featureIconMap = {
  amenity: MapPin,
  nature: Tag,
  layout: Ruler,
  garden: Flower, // Added
  drainage: Droplets, // Added
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

// Fixed to handle more than 8 items using modulo (%)
const getGridSpan = (index) => {
  const patternIndex = index % 8; // Loops pattern continuously
  switch (patternIndex) {
    case 0:
      return "col-span-1 md:col-span-2 row-span-1 md:row-span-2"; // Large square
    case 1:
      return "col-span-1 row-span-1"; // Standard
    case 2:
      return "col-span-1 md:row-span-2"; // Tall
    case 3:
      return "col-span-1 row-span-1"; // Standard
    case 4:
      return "col-span-1 md:col-span-2 row-span-1"; // Wide
    case 5:
      return "col-span-1 md:row-span-2"; // Tall
    case 6:
      return "col-span-1 md:row-span-2"; // Tall
    case 7:
      return "col-span-1 md:col-span-2 row-span-1"; // Wide
    default:
      return "col-span-1 row-span-1";
  }
};

const PromoSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <section className="relative w-full bg-[#FAF9F6] font-sans pt-24 flex flex-col items-center overflow-hidden">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#059669]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      {/* --- 1. EDITORIAL HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-5 mb-16 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-4 h-4 text-[#059669]" />
          <span className="text-xs sm:text-sm font-bold text-[#059669] uppercase tracking-[0.2em]">
            Premium Plotted Development in Mysore
          </span>
          <Sparkles className="w-4 h-4 text-[#059669]" />
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#06170e] tracking-tight leading-[1.1]">
          Invest in the{" "}
          <span className="text-[#059669] font-serif italic">Royal City</span>.
          <br /> Build Your{" "}
          <span className="text-[#059669] font-serif italic">Legacy</span>.
        </h2>
      </motion.div>

      {/* --- 2. ADVANCED BENTO GRID GALLERY --- */}
      <div className="w-full max-w-8xl px-4 md:px-8 mb-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[280px] grid-flow-dense"
        >
          {GALLERY_ITEMS.map((item, index) => {
            // Added fallback to MapPin just in case an unknown type is used in the future
            const Icon = featureIconMap[item.type] || MapPin;
            const gridSpan = getGridSpan(index);

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                onClick={() => setSelectedImage(item)}
                className={`${gridSpan} group relative bg-gray-200 rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer isolate ring-1 ring-black/5 shadow-sm hover:shadow-2xl transition-all duration-500`}
              >
                {/* Background Image with smooth scale */}
                <img
                  src={item.src}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />

                {/* Always-on subtle bottom gradient for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#06170e]/90 via-[#06170e]/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Darkening Overlay */}
                <div className="absolute inset-0 bg-[#06170e]/20 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                {/* --- CONTENT OVERLAY --- */}

                {/* Top Right: Glassmorphic Icon */}
                <div className="absolute top-5 right-5 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white shadow-lg group-hover:bg-[#059669] group-hover:border-[#059669] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 z-10">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>

                {/* Bottom Content Container */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end z-10">
                  {/* Subtitle (Fades in and slides up on hover) */}
                  <span className="text-[#10b981] text-xs font-bold uppercase tracking-widest mb-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {item.desc}
                  </span>

                  <div className="flex items-end justify-between gap-4">
                    {/* Main Title */}
                    <h4 className="text-white font-extrabold text-lg md:text-2xl leading-tight drop-shadow-md">
                      {item.label}
                    </h4>

                    {/* Expand Arrow (Slides in from right) */}
                    <div className="w-10 h-10 rounded-full bg-white text-[#059669] flex items-center justify-center shrink-0 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out shadow-lg">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Animated Underline */}
                  <div className="w-0 h-[3px] bg-[#10b981] mt-4 group-hover:w-full transition-all duration-700 ease-out rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* --- 3. PREMIUM DARK PROMO BANNER --- */}
      <div className="w-full bg-[#06170e] relative py-20 md:py-32 border-t-[10px] border-[#059669] overflow-hidden">
        {/* Dynamic Background Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#059669]/20 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#10b981]/10 blur-[120px] rounded-full pointer-events-none translate-y-1/2" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full"
          >
            {/* Elegant Divider */}
            <div className="flex items-center justify-center w-full mb-8 opacity-30">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#059669]" />
              <div className="w-3 h-3 rotate-45 bg-[#059669] mx-4" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#059669]" />
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white tracking-tight leading-none mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#10b981] to-[#047857] font-sans font-black pr-3 drop-shadow-lg">
                150+
              </span>
              EXCLUSIVE PLOTS
            </h2>
            <p className="text-xl md:text-3xl text-gray-300 tracking-[0.25em] uppercase font-light mt-4">
              Spread Across 13 Acres in Mysuru
            </p>

            <div className="flex items-center justify-center w-full mt-8 opacity-30">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#059669]" />
              <div className="w-3 h-3 rotate-45 bg-[#059669] mx-4" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#059669]" />
            </div>
          </motion.div>

          <p className="text-white/80 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mt-12 mb-10 bg-white/5 py-3 px-8 rounded-full border border-white/10 backdrop-blur-md">
            Limited Inventory <span className="mx-3 text-[#10b981]">|</span>{" "}
            Unprecedented Demand
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center bg-[#059669] text-white font-black uppercase tracking-[0.2em] py-5 px-12 rounded-sm shadow-[0_15px_35px_rgba(5,150,105,0.4)] hover:shadow-[0_20px_45px_rgba(5,150,105,0.6)] hover:bg-[#047857] transition-all duration-300 overflow-hidden text-sm md:text-base"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
            <span className="relative z-10">Secure Your Plot Today</span>
          </motion.a>
        </div>
      </div>

      {/* --- 4. ADVANCED LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            {/* Ultra-minimal Close Button */}
            <button className="absolute top-6 right-6 md:top-10 md:right-10 w-14 h-14 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 z-50">
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            <div
              className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10"
              >
                <img
                  src={selectedImage.src.replace("w=600", "w=1600")} // Force high-res
                  alt={selectedImage.label}
                  className="max-w-full max-h-[75vh] object-contain"
                />
              </motion.div>

              {/* Modal Caption */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-8 bg-white/5 px-8 py-4 rounded-full border border-white/10 backdrop-blur-md"
              >
                <span className="text-[#10b981] font-bold uppercase tracking-widest text-xs md:text-sm block mb-1">
                  {selectedImage.type} Features
                </span>
                <h5 className="text-white text-xl md:text-3xl font-extrabold tracking-tight">
                  {selectedImage.label}
                </h5>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Styles for Shimmer Animation */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default PromoSection;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Leaf,
  Car,
  Building2,
  Download,
  Play,
} from "lucide-react";

// Ensure these paths match your project structure
import DownloadModal from "@/components/ui/model/DownloadModal";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

const SobhaHoskoteHero = () => {
  // --- STATES ---
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Scroll Lock Management
  useEffect(() => {
    const shouldLock = isDownloadModalOpen || isEnquiryModalOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDownloadModalOpen, isEnquiryModalOpen]);

  // Scroll Handler
  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[100dvh] bg-[#050505] font-sans overflow-hidden">
      {/* ================= BACKGROUND LAYER ================= */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/one-world/night-elevation.jpg"
            alt="Sobha One World Luxury Landscape"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* --- CINEMATIC GRADIENTS --- */}
        {/* Bottom Gradient: Stronger on mobile to make text readable */}
        <div className="absolute inset-x-0 bottom-0 h-4/5 md:h-3/4 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        {/* Left Gradient: Fades out on mobile to avoid covering the image too much */}
        <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
      </div>

      {/* ================= CONTENT LAYER ================= */}
      {/* Added pb-28 for mobile to clear the fixed bottom buttons */}
      <div className="relative z-20 max-w-8xl mx-auto px-5 sm:px-8 md:px-12 h-full flex flex-col justify-end pb-28 md:pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl space-y-5 md:space-y-8"
        >
          {/* 1. Badge / Location */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#C5A059] text-black text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg">
              <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
              Pre-Launch
            </div>
            <div className="flex items-center gap-1.5 text-gray-300 text-xs md:text-sm font-medium tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              East Bangalore
            </div>
          </motion.div>

          {/* 2. Main Title (Responsive Typography) */}
          <motion.div variants={itemVariants} className="relative">
            <h2 className="text-sm md:text-xl font-light text-gray-400 tracking-[0.2em] md:tracking-[0.3em] mb-1 md:mb-2 pl-1">
              SOBHA LIMITED PRESENTS
            </h2>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight drop-shadow-2xl">
              SOBHA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E6C785] to-white/90">
                ONE WORLD
              </span>
            </h1>
          </motion.div>

          {/* 3. Description & Price */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12 border-l-2 border-[#C5A059] pl-5 md:pl-8"
          >
            <p className="text-gray-300 font-light text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
              A 48-acre integrated township designed for the elite. Experience
              the perfect blend of nature and urban luxury.
            </p>
            <div>
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-0.5 md:mb-1">
                Starting Price
              </p>
              <p className="text-xl md:text-3xl font-bold text-white">
                ₹ -- Lakhs*
                <span className="text-[#C5A059] text-sm align-top">*</span>
              </p>
            </div>
          </motion.div>

          {/* 4. Glassmorphic USPs (Scrollable on very small screens) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 md:gap-4 pt-2"
          >
            {[
              { icon: Car, label: "20 Mins to ITPL" },
              { icon: Leaf, label: "60% Open Space" },
              { icon: Building2, label: "2, 3 & 4 BHK" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm hover:bg-white/10 transition-colors"
              >
                <item.icon className="w-4 h-4 text-[#C5A059]" />
                <span className="text-xs md:text-sm text-gray-200 font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* 5. Desktop Action Buttons (Hidden on Mobile) */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex flex-row gap-4 pt-4"
          >
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="group relative px-8 py-4 bg-[#C5A059] text-black font-bold text-sm uppercase tracking-widest overflow-hidden rounded-sm hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] transition-all"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Download className="w-4 h-4" /> Download Brochure
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </button>

            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="group flex items-center justify-center gap-3 px-8 py-4 border border-white/20 hover:border-white text-white font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-sm backdrop-blur-sm"
            >
              <Play className="w-3 h-3 fill-current" /> Virtual Tour
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ================= DECORATIVE ELEMENTS ================= */}

      {/* Right Side Vertical Text (Desktop Only) */}
      <div className="hidden lg:block absolute right-12 bottom-20 z-20">
        <div className="flex flex-col items-center gap-6">
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-[#C5A059]" />
          <button
            onClick={handleScrollDown}
            className="writing-vertical-rl text-xs font-bold text-[#C5A059] tracking-[0.3em] uppercase opacity-80 hover:opacity-100 transition-opacity"
          >
            Scroll to Explore
          </button>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM BAR (2 Buttons) ================= */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex gap-3"
      >
        {/* Mobile Button 1: Brochure */}
        <button
          onClick={() => setIsDownloadModalOpen(true)}
          className="flex-1 py-3.5 bg-black/60 backdrop-blur-xl border border-white/10 text-white font-bold uppercase text-[10px] tracking-wider rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Download className="w-4 h-4 text-[#C5A059]" /> Brochure
        </button>

        {/* Mobile Button 2: Enquire */}
        <button
          onClick={() => setIsEnquiryModalOpen(true)}
          className="flex-1 py-3.5 bg-[#C5A059] text-black font-bold uppercase text-[10px] tracking-wider shadow-xl rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 fill-current" /> Enquire
        </button>
      </motion.div>

      {/* --- MODALS --- */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        defaultProjectName="Sobha One World"
      />

      <EnquiryModel
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultProjectName="Sobha One World"
      />
    </section>
  );
};

export default SobhaHoskoteHero;

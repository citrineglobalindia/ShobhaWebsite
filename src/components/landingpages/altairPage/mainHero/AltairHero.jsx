"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Download, ArrowRight, Star } from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

const AltairHero = () => {
  // --- STATE FOR MODALS ---
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // --- SCROLL LOCK ---
  useEffect(() => {
    if (isDownloadOpen || isEnquiryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDownloadOpen, isEnquiryOpen]);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden font-sans">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg')",
          }}
        />
        {/* Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 md:via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-24 md:py-0">
        <div className="max-w-2xl space-y-6 md:space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 bg-[#C5A059] text-black text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm"
          >
            <Star className="w-3 h-3 fill-black" />
            Pre-Launch Offer Live
          </motion.div>

          {/* Titles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-3 md:mb-4">
              Sobha <span className="text-[#C5A059]">Altair</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-gray-300 text-base md:text-xl font-light">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#C5A059] shrink-0" />
              <p>Sir M Visvesvaraya Terminal, Bengaluru</p>
            </div>
          </motion.div>

          {/* Key Specs Grid (Glass Box) - Responsive Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 border-l-4 border-[#C5A059] pl-4 md:pl-6 bg-white/5 backdrop-blur-sm py-4 md:py-6 rounded-r-lg max-w-xl"
          >
            <div>
              <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider mb-1">
                Configurations
              </p>
              <p className="text-white text-lg md:text-xl font-semibold">
                3, 3.5 & 4 BHK
              </p>
              <p className="text-gray-400 text-xs md:text-sm">
                Luxury Apartments
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider mb-1">
                Starting From
              </p>
              <p className="text-[#C5A059] text-xl md:text-2xl font-bold">
                ₹ 19500/sqft*
              </p>
              <p className="text-gray-400 text-[10px] md:text-xs">
                Limited Time Offer
              </p>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-300"
          >
            <span className="px-3 py-1.5 border border-white/20 rounded-full bg-black/20">
              3 mins from Wipro Campus
            </span>
            <span className="px-3 py-1.5 border border-white/20 rounded-full bg-black/20">
              Heart of Bangalore
            </span>
          </motion.div>

          {/* CTA Buttons - Stack on mobile, row on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-6 w-full sm:w-auto"
          >
            {/* Download Button */}
            <button
              onClick={() => setIsDownloadOpen(true)}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-white text-black px-6 py-3.5 md:px-8 md:py-4 font-bold uppercase tracking-widest transition-all duration-300 text-xs md:text-sm shadow-lg shadow-[#C5A059]/20"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              Download Brochure
            </button>

            {/* Enquiry Button */}
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 border border-white text-white hover:border-[#C5A059] hover:bg-[#C5A059]/10 hover:text-[#C5A059] px-6 py-3.5 md:px-8 md:py-4 font-bold uppercase tracking-widest transition-all duration-300 text-xs md:text-sm"
            >
              Enquire Now
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        defaultProjectName="Sobha Altair"
      />

      <EnquiryModel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProjectName="Sobha Altair"
      />
    </section>
  );
};

export default AltairHero;

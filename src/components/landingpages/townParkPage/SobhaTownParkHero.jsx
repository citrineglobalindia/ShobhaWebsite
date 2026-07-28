"use client";

import React, { useState, useEffect } from "react";
import { MapPin, ArrowRight, Download } from "lucide-react";
import EnquiryModel from "@/components/ui/model/EnquiryModel";
import DownloadModal from "@/components/ui/model/DownloadModal";

const SobhaTownparkHero = () => {
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
    <div className="relative w-full min-h-screen lg:h-[95vh] flex items-center justify-start bg-slate-900 overflow-hidden font-sans">
      {/* --- 1. Background Image --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/townpark_gydga7.jpg"
          alt="Sobha Townpark Exterior"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient Overlay: Darker on mobile for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900 lg:bg-gradient-to-r lg:from-slate-900 lg:via-slate-900/80 lg:to-transparent"></div>
      </div>

      {/* --- 2. Hero Content --- */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-12 py-20 lg:py-0">
        <div className="max-w-3xl space-y-6 md:space-y-8">
          {/* Top Badges */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="bg-yellow-500 text-slate-900 px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded shadow-lg">
              New Launch
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 text-[10px] md:text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
              20:80 Payment Plan
            </span>
          </div>

          {/* Main Titles */}
          <div className="space-y-2">
            <h2 className="text-lg md:text-2xl text-gray-300 font-light tracking-wide">
              By Sobha Limited
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Sobha <span className="text-yellow-500">Townpark</span>
            </h1>
          </div>

          {/* Location */}
          <div className="flex items-start md:items-center gap-2 text-gray-300 text-base md:text-xl">
            <MapPin className="w-5 h-5 text-yellow-500 mt-1 md:mt-0 shrink-0" />
            <p>Near Electronic City, On Hosur Main Road</p>
          </div>

          {/* Configuration & Price Block (Glass Card) */}
          <div className="bg-white/10 backdrop-blur-md border-l-4 border-yellow-500 p-5 md:p-6 rounded-r-lg max-w-lg shadow-2xl">
            <p className="text-gray-200 text-xs md:text-sm uppercase tracking-wide mb-1">
              Luxurious 2, 2.5, 3, 4 & 4.5 BHK
            </p>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xs md:text-sm text-gray-300">
                Starting From
              </span>
              <span className="text-2xl md:text-4xl font-bold text-white">
                ₹1.72 Cr*
              </span>
              <span className="text-xs md:text-sm text-gray-300">Onwards</span>
            </div>
            <p className="text-yellow-400 text-xs md:text-sm font-medium mt-2 flex items-center gap-1">
              <span>◆</span> Limited Time Launch Offers Available
            </p>
          </div>

          {/* CTAs - Stacked on Mobile, Row on Desktop */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-8 py-4 rounded transition-all transform active:scale-95 hover:-translate-y-1 shadow-lg shadow-yellow-500/20 text-sm md:text-base uppercase tracking-wider"
            >
              Enquire Now
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsDownloadOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 font-bold px-8 py-4 rounded transition-all active:scale-95 text-sm md:text-base uppercase tracking-wider backdrop-blur-sm"
            >
              <Download className="w-5 h-5" />
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* --- 3. Bottom Ribbon (Responsive) --- */}
      <div className="absolute bottom-0 w-full bg-slate-950/90 border-t border-slate-800 py-3 md:py-4 z-20">
        <div className="max-w-8xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-sm text-gray-400 gap-2 md:gap-0">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> RERA No:
            Applied
          </span>
          <span className="hidden md:inline text-slate-700">|</span>
          <span className="flex items-center gap-2 text-center">
            <div className="hidden md:block w-1.5 h-1.5 bg-yellow-500 rounded-full" />{" "}
            East Bangalore's Most Awaited Launch
          </span>
          <span className="hidden md:inline text-slate-700">|</span>
          <span className="flex items-center gap-2">
            <div className="hidden md:block w-1.5 h-1.5 bg-red-500 rounded-full" />{" "}
            Limited Units Available
          </span>
        </div>
      </div>

      {/* --- MODAL COMPONENTS --- */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        defaultProjectName="Sobha Town Park"
      />

      <EnquiryModel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProjectName="Sobha Town Park"
      />
    </div>
  );
};

export default SobhaTownparkHero;

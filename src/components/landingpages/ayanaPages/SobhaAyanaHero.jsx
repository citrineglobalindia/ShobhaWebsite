"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  Download,
  CalendarDays,
} from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

const SobhaAyanaHero = () => {
  // --- STATE MANAGEMENT ---
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

  // Data exactly as per the screenshot
  const PROJECT_DETAILS = [
    { label: "PRICE", value: "2.3 Cr* Onwards" },
    { label: "SIZES", value: "1553 Sq. Ft.* Onwards" },
    { label: "CONFIGURATIONS", value: "3 BHK Apartments" },
    { label: "STATUS", value: "Under Construction" },
    { label: "RERA NO.", value: "446/PR/030824/006958" },
  ];

  return (
    <section className="relative w-full h-[100dvh] bg-[#0a0a0a] font-sans overflow-hidden">
      {/* --- 1. BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442585/ayna_rgsfz3.jpg"
            alt="Sobha Ayana Facade"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
      </div>

      {/* --- 2. MAIN CONTENT (Bottom Aligned) --- */}
      <div className="absolute bottom-0 left-0 w-full z-20 pb-24 md:pb-12 px-6 md:px-12">
        <div className="max-w-8xl mx-auto">
          {/* Title & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
              Sobha Ayana
            </h1>
            <p className="text-base md:text-lg text-white/90 font-medium flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-[#C5A059]" />
              Panathur, Off Marathahalli-ORR, East Bangalore
            </p>
          </motion.div>

          {/* Info Bar & CTA Grid */}
          <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8">
            {/* Data Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-y-6 text-white"
            >
              {PROJECT_DETAILS.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="pr-6 md:pr-8">
                    <h4 className="text-[#C5A059] text-xs md:text-sm font-bold uppercase tracking-wider mb-1">
                      {item.label}
                    </h4>
                    <p className="text-sm md:text-lg font-bold text-white whitespace-nowrap">
                      {item.value}
                    </p>
                  </div>
                  {/* Vertical Divider */}
                  {index !== PROJECT_DETAILS.length - 1 && (
                    <div className="hidden md:block w-[1px] h-10 bg-white/30 mr-6 md:mr-8" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Desktop CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="hidden md:flex items-center gap-4"
            >
              {/* Button 1: Download - FIXED ONCLICK HANDLER */}
              <button
                onClick={() => setIsDownloadOpen(true)}
                className="group flex items-center gap-2 px-8 py-4 border border-white/30 hover:border-[#C5A059] text-white font-bold text-sm uppercase tracking-widest transition-all rounded-sm hover:bg-black/40 backdrop-blur-sm"
              >
                <Download className="w-4 h-4 group-hover:text-[#C5A059] transition-colors" />
                <span>Brochure</span>
              </button>

              {/* Button 2: Site Visit */}
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="group flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08d4b] text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-sm shadow-lg shadow-orange-900/20 transition-all active:scale-95"
              >
                <CalendarDays className="w-4 h-4 text-white" />
                <span>Schedule Visit</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- 3. FLOATING ELEMENTS --- */}

      {/* Right Side Vertical Tab */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-50 hidden md:block">
        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="bg-[#C5A059] text-white font-bold text-sm uppercase tracking-widest py-8 px-2 rounded-l-md shadow-lg hover:bg-[#b08d4b] transition-colors writing-vertical-rl rotate-180 flex items-center gap-2 group"
        >
          <MessageCircle className="w-4 h-4 rotate-90 mb-2 group-hover:scale-110 transition-transform" />
          Enquire Now
        </button>
      </div>

      {/* Bottom Left WhatsApp FAB */}
      <div className="fixed bottom-24 md:bottom-8 left-6 md:left-12 z-50">
        <a
          href="https://wa.me/919902730474"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce-slow"
        >
          <Phone className="w-6 h-6 text-white fill-current" />
        </a>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 p-4 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 flex gap-3">
        <button
          onClick={() => setIsDownloadOpen(true)}
          className="flex-1 border border-white/20 text-white font-bold py-3.5 rounded-sm uppercase tracking-widest text-xs"
        >
          Brochure
        </button>
        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="flex-[2] bg-[#C5A059] text-white font-bold py-3.5 rounded-sm uppercase tracking-widest text-xs shadow-lg"
        >
          Schedule Site Visit
        </button>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Download Brochure Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        defaultProjectName="Sobha Ayana"
      />

      {/* 2. Enquiry / Site Visit Modal */}
      <EnquiryModel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProjectName="Sobha Ayana"
      />

      {/* CSS Utility for Vertical Text */}
      <style jsx>{`
        .writing-vertical-rl {
          writing-mode: vertical-rl;
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

// Helper Icon Component
function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default SobhaAyanaHero;

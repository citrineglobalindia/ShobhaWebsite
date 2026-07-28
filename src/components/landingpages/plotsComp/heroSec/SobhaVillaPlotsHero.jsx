"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Download, CalendarDays } from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

const SobhaVillaPlotsHero = () => {
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

  // Updated Data for Villa Plots
  const PROJECT_DETAILS = [
    { label: "PRICE", value: "₹----/sq.ft* Onwards" },
    { label: "SIZES", value: "1200 to 2400 Sq. Ft." },
    { label: "PROJECT TYPE", value: "Boulevard Mysore Plots" },
    { label: "STATUS", value: "Pre-Launch" },
    { label: "INVENTORY", value: "13 Acres / 150 Plots" },
  ];

  return (
    <section className="relative w-full h-[calc(100dvh-72px)] mt-[72px] bg-[#06170e] font-sans overflow-hidden">
      {/* --- 1. BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          {/* Standard img tag to bypass Next.js external domain restrictions */}
          <img
            src="https://res.cloudinary.com/djxsxevds/image/upload/v1783604814/hreo_guqdfp.webp"
            alt="Sobha Premium Villa Plots"
            className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
          />
        </motion.div>

        {/* Cinematic Gradient Overlay: Stronger on mobile for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 md:via-[#062c19]/50 to-transparent z-10" />
      </div>

      {/* --- 2. MAIN CONTENT (Bottom Aligned) --- */}
      {/* Increased pb-36 on mobile so text clears the sticky buttons and WhatsApp icon */}
      <div className="absolute bottom-0 left-0 w-full z-20 pb-36 md:pb-12 px-5 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Title & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2 md:mb-3 tracking-tight drop-shadow-xl leading-tight">
              SOBHA
              <br className="md:hidden" /> Sobha Boulevard Mysore Plots
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium flex items-center gap-2 drop-shadow-md">
              <MapPinIcon className="w-4 h-4 md:w-5 md:h-5 text-[#10b981] flex-shrink-0" />
              <span className="line-clamp-1 sm:line-clamp-none">
                Near Infosys Campus Mysore
              </span>
            </p>
          </motion.div>

          {/* Info Bar & CTA Grid */}
          <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8">
            {/* Data Grid: Uses Grid on mobile for neat alignment, Flex on desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-start md:items-center gap-y-5 gap-x-4 md:gap-y-6 text-white w-full xl:w-auto"
            >
              {PROJECT_DETAILS.map((item, index) => (
                <div key={index} className="flex items-center w-full md:w-auto">
                  <div className="pr-0 md:pr-8">
                    <h4 className="text-[#10b981] text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider mb-1 drop-shadow-sm">
                      {item.label}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-lg font-bold text-white drop-shadow-sm">
                      {item.value}
                    </p>
                  </div>
                  {/* Vertical Divider (Hidden on mobile grid, visible on desktop flex) */}
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
              className="hidden md:flex items-center gap-4 flex-shrink-0"
            >
              {/* Button 2: Site Visit */}
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="group flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-sm shadow-lg shadow-green-900/30 transition-all active:scale-95"
              >
                <CalendarDays className="w-4 h-4 text-white" />
                <span>Schedule Visit</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- 3. FLOATING ELEMENTS --- */}

      {/* Right Side Vertical Tab (Desktop Only) */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-50 hidden md:block">
        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="bg-[#059669] text-white font-bold text-sm uppercase tracking-widest py-8 px-2 rounded-l-md shadow-lg hover:bg-[#047857] transition-colors writing-vertical-rl rotate-180 flex items-center gap-2 group"
        >
          <MessageCircle className="w-4 h-4 rotate-90 mb-2 group-hover:scale-110 transition-transform" />
          Enquire Now
        </button>
      </div>

      {/* Bottom Left WhatsApp FAB - FIXED URL */}
      <div className="fixed bottom-20 md:bottom-8 left-5 md:left-12 z-50">
        <a
          href="https://api.whatsapp.com/send?phone=919902730474"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce-slow"
        >
          <Phone className="w-5 h-5 md:w-6 md:h-6 text-white fill-current" />
        </a>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 p-3 bg-black/95 backdrop-blur-md border-t border-white/10 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button
          onClick={() => setIsDownloadOpen(true)}
          className="flex-1 border border-[#10b981]/50 text-white font-bold py-3.5 rounded-sm uppercase tracking-widest text-[10px] sm:text-xs active:bg-white/10 transition-colors"
        >
          Brochure
        </button>
        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="flex-[2] bg-[#059669] hover:bg-[#047857] text-white font-bold py-3.5 rounded-sm uppercase tracking-widest text-[10px] sm:text-xs shadow-lg transition-colors"
        >
          Schedule Site Visit
        </button>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Download Brochure Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        defaultProjectName="SOBHA Premium Villa Plots"
      />

      {/* 2. Enquiry / Site Visit Modal */}
      <EnquiryModel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProjectName="SOBHA Premium Villa Plots"
      />

      {/* CSS Utility for Vertical Text & Animations */}
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

export default SobhaVillaPlotsHero;

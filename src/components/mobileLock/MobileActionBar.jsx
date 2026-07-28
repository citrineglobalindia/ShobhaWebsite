"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, FileText, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryModel from "../ui/model/EnquiryModel";

const MobileActionBar = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal

  // --- AUTO-TOGGLE TOOLTIP LOGIC ---
  useEffect(() => {
    // Initial delay before first appearance
    const initialTimeout = setTimeout(() => setShowTooltip(true), 2000);

    // Loop: Show for 4s, Hide for 8s
    const interval = setInterval(() => {
      setShowTooltip((prev) => !prev);
    }, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // --- HANDLERS ---
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {/* --- MOBILE ACTION BAR CONTAINER --- */}
      {/* Only visible on mobile screens (lg:hidden) */}
      <div className="fixed bottom-0 left-0 w-full z-[100] lg:hidden font-sans pointer-events-none">
        {/* --- 1. FLOATING CHAT WIDGET --- */}
        <div className="absolute bottom-20 right-4 z-50 flex flex-col items-end pointer-events-auto">
          {/* Tooltip Bubble */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="mb-2 mr-1 bg-white text-black px-4 py-2 rounded-xl shadow-xl shadow-black/20 border border-gray-100 flex items-center gap-2 relative"
              >
                <span className="text-sm">👋</span>
                <span className="text-xs font-bold text-gray-800 whitespace-nowrap">
                  We are Online!
                </span>

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                  className="ml-2 p-0.5 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>

                {/* Triangle Pointer */}
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button (Opens Modal) */}
          <button
            onClick={handleOpenModal}
            className="group w-14 h-14 bg-[#C5A059] rounded-full flex items-center justify-center shadow-2xl shadow-black/50 border-2 border-white/20 active:scale-90 transition-all duration-300"
          >
            <div className="relative">
              <MessageSquare className="w-7 h-7 text-black fill-current group-hover:scale-110 transition-transform" />
              {/* Online Status Dot */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#C5A059] rounded-full animate-pulse"></span>
            </div>
          </button>
        </div>

        {/* --- 2. MAIN BOTTOM BAR --- */}
        <div className="bg-[#0a0a0a]/95 backdrop-blur-lg text-white rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.4)] border-t border-[#C5A059] flex items-center justify-between px-2 py-3 pb-safe pointer-events-auto">
          {/* Item 1: Call Us */}
          <a
            href="tel:+919902730474"
            className="flex-1 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform group"
          >
            <div className="p-1.5 rounded-full group-active:bg-[#C5A059]/20 transition-colors">
              <Phone className="w-5 h-5 text-white group-active:text-[#C5A059] transition-colors stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300 group-active:text-[#C5A059]">
              Call
            </span>
          </a>

          {/* Divider */}
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {/* Item 2: WhatsApp */}
          <a
            href="https://wa.me/919902730474"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform group"
          >
            <div className="p-1.5 rounded-full group-active:bg-[#C5A059]/20 transition-colors">
              <MessageCircle className="w-5 h-5 text-white group-active:text-[#C5A059] transition-colors stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300 group-active:text-[#C5A059]">
              WhatsApp
            </span>
          </a>

          {/* Divider */}
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {/* Item 3: Enquire Now (Opens Modal) */}
          <button
            onClick={handleOpenModal}
            className="flex-1 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform group"
          >
            <div className="p-1.5 rounded-full group-active:bg-[#C5A059]/20 transition-colors">
              <FileText className="w-5 h-5 text-white group-active:text-[#C5A059] transition-colors stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300 group-active:text-[#C5A059]">
              Enquire
            </span>
          </button>
        </div>
      </div>

      {/* --- INTEGRATED MODAL --- */}
      <EnquiryModel
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultProjectName="General Enquiry"
      />
    </>
  );
};

export default MobileActionBar;

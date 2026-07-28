"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Phone,
  ChevronRight,
  Building2,
  MessageCircle,
  Download,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import EnquiryModel from "../model/EnquiryModel";
import DownloadModal from "../model/DownloadModal";

// --- DATA FOR MOBILE SIDEBAR ---
const FEATURED_LINKS = [
  {
    name: "Sobha Altair",
    href: "/sobha-altair",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg",
    desc: "Sarjapur Road, Near Wipro",
  },
  {
    name: "Sobha One World",
    href: "/sobha-hoskote",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/hoskote_cxdrzp.jpg",
    desc: "East Bengaluru",
  },
  {
    name: "Sobha Town Park",
    href: "/sobha-town-park",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/townpark_gydga7.jpg",
    desc: "Hosur road - near Narayan hrudayala hospital",
  },
  {
    name: "Sobha Ayana",
    href: "/sobha-ayana",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442585/ayna_rgsfz3.jpg",
    desc: "Panathur Road",
  },
  {
    name: "SOBHA Boulevard Mysore Plots",
    href: "/sobha-premium-villa-plots",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775664046/hero_1_urnb1g.jpg",
    desc: "Pre-Launch: ₹----/sq.ft*",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Modal States
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Toggle Mobile Sidebar
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle Enquiry Click
  const handleEnquiryClick = () => {
    setIsOpen(false);
    setIsEnquiryModalOpen(true);
  };

  // Handle Brochure Click
  const handleBrochureClick = () => {
    setIsOpen(false);
    setIsDownloadModalOpen(true);
  };

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Scroll Shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          scrolled ? "shadow-md py-2" : "py-3 md:py-3 border-b border-gray-100"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 md:px-8 flex items-center justify-between h-full">
          {/* LOGO SECTION - MODIFIED */}
          <Link
            href="/"
            className="relative z-50 flex flex-col items-start shrink-0 group"
          >
            <div className="relative w-28 h-8 md:w-32 md:h-9">
              <Image
                src="/logosobha.webp"
                alt="Sobha Realty Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            {/* ADDED TEXT BELOW LOGO */}
            <span className="text-[8px] md:text-[8px] font-medium text-gray-500 uppercase tracking-wide mt-0.5 group-hover:text-[#C5A059] transition-colors">
              Authorized Channel Partner
            </span>
          </Link>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleEnquiryClick}
              className="flex items-center gap-2 bg-black hover:bg-[#C5A059] text-white hover:text-white px-5 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group"
            >
              <Phone className="w-3.5 h-3.5 group-hover:animate-pulse" />
              <span>Request Call</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-800 hover:text-[#C5A059] transition-colors rounded-full hover:bg-gray-50 active:scale-90"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* --- ADVANCED MOBILE DRAWER (LEFT SIDE) --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl md:hidden flex flex-col border-r border-[#C5A059]/10"
            >
              {/* 1. Header Area */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                {/* Logo in Drawer Header - MODIFIED */}
                <div className="flex flex-col items-start">
                  <div className="relative w-24 h-6">
                    <Image
                      src="/logosobha.webp"
                      alt="Sobha Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  {/* ADDED TEXT BELOW LOGO IN DRAWER */}
                  <span className="text-[9px] font-medium text-gray-500 uppercase tracking-wide mt-1">
                    Authorized Channel Partner
                  </span>
                </div>

                <button
                  onClick={toggleMenu}
                  className="p-2 bg-white text-gray-500 rounded-full shadow-sm hover:bg-[#C5A059] hover:text-white transition-all active:rotate-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-8">
                {/* Section: Featured Projects */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#C5A059]">
                    <Building2 className="w-4 h-4" />
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-black">
                      Featured Collections
                    </h3>
                  </div>

                  <div className="grid gap-3">
                    {FEATURED_LINKS.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={toggleMenu}
                        className="group relative flex items-center gap-4 p-3 rounded-xl bg-white border border-gray-100 hover:border-[#C5A059] hover:shadow-lg hover:shadow-[#C5A059]/10 transition-all duration-300"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#C5A059] truncate transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-gray-500 truncate">
                            {item.desc}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Section: Actions */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-black">
                    Quick Actions
                  </h3>
                  <button
                    onClick={handleBrochureClick}
                    className="w-full flex items-center justify-between p-4 bg-gray-900 text-white rounded-xl hover:bg-[#C5A059] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-white/10 rounded-full">
                        <Download className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold">
                        Download Brochure
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                  </button>
                </div>
              </div>

              {/* 3. Sticky Bottom Actions (WhatsApp/Call) */}
              <div className="p-5 border-t border-gray-100 bg-white/80 backdrop-blur-md pb-8">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/919902730474"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center gap-1 p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase">
                      WhatsApp
                    </span>
                  </a>
                  <a
                    href="tel:+919902730474"
                    className="flex flex-col items-center justify-center gap-1 p-3 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 rounded-xl hover:bg-[#C5A059] hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase">
                      Call Now
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- INTEGRATED MODALS --- */}
      <EnquiryModel
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultProjectName="General Enquiry"
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        defaultProjectName="General Brochure"
      />
    </>
  );
};

export default Navbar;

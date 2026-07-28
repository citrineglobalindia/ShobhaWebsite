"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  HeartPulse,
  ArrowRight,
  Download,
  Car,
} from "lucide-react";

// --- IMPORT MODALS ---
import DownloadModal from "@/components/ui/model/DownloadModal";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

// --- REAL LOCATION DATA FOR SOBHA TOWNPARK ---
const LOCATION_DATA = [
  {
    category: "Work Hubs",
    icon: <Briefcase className="w-5 h-5" />,
    items: [
      { name: "Electronic City Phase 1", time: "10 Mins" },
      { name: "Biocon Campus", time: "12 Mins" },
      { name: "HCL Technologies", time: "15 Mins" },
      { name: "Infosys Campus", time: "18 Mins" },
    ],
  },
  {
    category: "Education",
    icon: <GraduationCap className="w-5 h-5" />,
    items: [
      { name: "Narayana E-Techno School", time: "05 Mins" },
      { name: "Alliance University", time: "15 Mins" },
      { name: "Treamis World School", time: "20 Mins" },
    ],
  },
  {
    category: "Healthcare",
    icon: <HeartPulse className="w-5 h-5" />,
    items: [
      { name: "Narayana Health City", time: "10 Mins" },
      { name: "Sparsh Hospital", time: "12 Mins" },
      { name: "Mazumdar Shaw Med Ctr", time: "15 Mins" },
    ],
  },
  {
    category: "Connectivity",
    icon: <Car className="w-5 h-5" />,
    items: [
      { name: "NICE Road Junction", time: "05 Mins" },
      { name: "Upcoming Metro Station", time: "02 Mins" },
      { name: "Silk Board", time: "30 Mins" },
    ],
  },
];

const TownparkLocation = () => {
  // --- STATE ---
  const [activeCategory, setActiveCategory] = useState(0);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <section className="relative py-20 bg-white font-sans overflow-hidden text-slate-900">
      {/* Background Map Pattern (Subtle Grey) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-4 md:px-6 lg:px-12 xl:px-12 2xl:px-12 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
            Strategic Location
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            The Center of <span className="text-[#C5A059]">Growth</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Located on Hosur Road, Near Narayan Hrudayala Hospital, Sobha
            Townpark offers seamless connectivity to Bangalore’s biggest IT hubs
            and social infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- LEFT: INTERACTIVE LIST --- */}
          <div>
            <div className="flex flex-wrap gap-4 mb-8">
              {LOCATION_DATA.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border
                    ${
                      activeCategory === idx
                        ? "bg-[#C5A059] text-white border-[#C5A059] shadow-lg shadow-[#C5A059]/30"
                        : "bg-white text-slate-500 border-slate-200 hover:border-[#C5A059] hover:text-[#C5A059]"
                    }
                  `}
                >
                  {cat.icon} {cat.category}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[300px]">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                <span className="p-2 bg-white rounded-lg shadow-sm text-[#C5A059]">
                  {LOCATION_DATA[activeCategory].icon}
                </span>
                {LOCATION_DATA[activeCategory].category}
              </h3>

              <div className="space-y-6">
                {LOCATION_DATA[activeCategory].items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0 last:pb-0 group"
                  >
                    <span className="text-lg text-slate-600 group-hover:text-[#C5A059] transition-colors font-medium">
                      {item.name}
                    </span>
                    <span className="text-sm font-bold bg-white border border-slate-200 px-3 py-1 rounded text-[#C5A059] shadow-sm">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsDownloadOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#0a1e38] text-white font-bold py-4 rounded-sm hover:bg-[#C5A059] transition-all uppercase text-xs tracking-widest shadow-lg"
              >
                <Download className="w-4 h-4" /> Download Location Map
              </button>
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 border border-slate-300 text-slate-700 font-bold py-4 rounded-sm hover:border-[#C5A059] hover:text-[#C5A059] hover:bg-white transition-all uppercase text-xs tracking-widest"
              >
                <MapPin className="w-4 h-4" /> Schedule Visit
              </button>
            </div>
          </div>

          {/* --- RIGHT: MAP PREVIEW (IFRAME) --- */}
          <div className="relative h-[500px] w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-xl group">
            {/* GOOGLE MAPS IFRAME */}

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14793.416154772993!2d77.744187!3d12.786878!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6e03e51367c7%3A0x65e34df5be85c70d!2sSOBHA%20Manhattan%20Towers%20-%20Townpark!5e1!3m2!1sen!2sin!4v1769617342353!5m2!1sen!2sin"
              className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Floating Info Card (Bottom Overlay) */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-slate-200 shadow-2xl pointer-events-none">
              <h4 className="text-[#C5A059] font-bold text-sm uppercase mb-1">
                Prime Address
              </h4>
              <p className="text-slate-800 text-lg font-medium leading-snug">
                Sobha Townpark, <br />
                Near Electronic City Phase 1, <br />
                Hosur Main Road, Bangalore.
              </p>

              {/* Pointer events auto allows clicking the button inside the non-clickable container */}
              <div className="pointer-events-auto mt-3">
                <a
                  href="https://goo.gl/maps/YourMapLinkHere"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-[#C5A059] transition-colors font-bold uppercase tracking-wide cursor-pointer"
                >
                  Get Directions <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- INTEGRATED MODALS --- */}
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
    </section>
  );
};

export default TownparkLocation;

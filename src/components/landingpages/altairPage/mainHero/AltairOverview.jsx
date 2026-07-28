"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  Map,
  Maximize,
  Home,
  Calendar,
  Layers,
  ShieldCheck,
  ArrowDownToLine,
  CheckCircle2,
} from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";

// --- DATA ---
const OVERVIEW_DATA = [
  { label: "Project Type", value: "Luxury Apartments", icon: Building },
  { label: "Land Area", value: "2.5 Acres", icon: Map },
  { label: "Structure", value: "3B + G + 18 Floors", icon: Layers },
  { label: "Total Units", value: "207 Exclusive Units", icon: Home },
  { label: "Unit Variants", value: "3, 3.5 & 4 BHK", icon: Maximize },
  { label: "Size Range", value: "1875 - 2550 Sq.Ft.", icon: Maximize },
  { label: "Possession", value: "Dec 2031*", icon: Calendar },
  { label: "RERA Status", value: "Applied", icon: ShieldCheck },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AltairOverview = () => {
  // --- MODAL STATE ---
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <section className="relative w-full bg-white font-sans">
      <div className="flex flex-col lg:flex-row">
        {/* --- LEFT: STICKY SIDEBAR --- */}
        <div className="lg:w-[40%] bg-[#02080f] text-white lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center p-8 md:p-16 relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-[#C5A059]"></span>
                <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em]">
                  Project Highlights
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Sobha Altair <br />
                <span className="text-gray-400 font-light italic">
                  At a Glance
                </span>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-4">
                A masterpiece of architectural design located in the heart of
                the city. Experience a lifestyle where luxury meets convenience,
                wrapped in the signature quality of Sobha.
              </p>
            </div>

            {/* CTA Box - INTEGRATED MODAL */}
            <div className="pt-8">
              <button
                onClick={() => setIsDownloadOpen(true)}
                className="group relative px-8 py-4 bg-[#C5A059] text-[#0a1e38] font-bold text-xs uppercase tracking-widest overflow-hidden transition-all hover:bg-white hover:text-[#0a1e38]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Download Brochure <ArrowDownToLine className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
              </button>
              <p className="mt-4 text-[10px] text-gray-500 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                Includes Floor Plans & Master Layout
              </p>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT: SCROLLABLE GRID --- */}
        <div className="lg:w-[60%] bg-[#F9F9F9] flex items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full grid grid-cols-1 sm:grid-cols-2"
          >
            {OVERVIEW_DATA.map((item, idx) => {
              const Icon = item.icon;
              const isEven = (idx + 1) % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`
                    group relative p-10 
                    border-b border-gray-200 
                    ${!isEven ? "sm:border-r border-gray-200" : ""}
                    hover:bg-white transition-colors duration-500
                  `}
                >
                  {/* Hover Accent Line */}
                  <div className="absolute top-0 left-0 w-1 h-0 bg-[#C5A059] group-hover:h-full transition-all duration-300 ease-in-out" />

                  <div className="flex flex-col h-full justify-between gap-6">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-white border border-gray-100 shadow-sm rounded-md group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors">
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-[#C5A059] transition-colors" />
                      </div>
                      <span className="text-5xl font-bold text-gray-100 group-hover:text-gray-50 transition-colors select-none">
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {item.label}
                      </h4>
                      <p className="text-xl font-bold text-[#0a1e38] group-hover:translate-x-1 transition-transform duration-300">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* --- RENDER MODAL --- */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        defaultProjectName="Sobha Altair"
      />
    </section>
  );
};

export default AltairOverview;

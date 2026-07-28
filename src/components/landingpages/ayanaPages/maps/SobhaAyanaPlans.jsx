"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize,
  Download,
  Map,
  Home,
  X,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
// Ensure this path matches your file structure
import DownloadModal from "@/components/ui/model/DownloadModal";

// --- CONFIGURATION ---
const PLANS_DATA = {
  master: {
    id: "master",
    label: "Master Plan",
    title: "Site Layout",
    desc: "A meticulously planned 6.29-acre township featuring 12 towers, 80% open green spaces, and a central wave garden.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769458792/masterplan_z80hxq.png",
    features: [
      "Entry/Exit Plaza",
      "Clubhouse Block",
      "Wave Garden",
      "Pet Park",
    ],
  },
  floor: {
    id: "floor",
    label: "Floor Plans",
    title: "Typical 3 BHK",
    desc: "Spacious 3 BHK layouts (1553 Sq.ft) designed for maximum ventilation, privacy, and Vaastu compliance.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769458792/floorplan_cogyzo.webp",
    features: ["Foyer Entry", "Large Balcony", "Utility Area", "Master Suite"],
  },
};

const SobhaAyanaPlans = () => {
  const [activeTab, setActiveTab] = useState("master");
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

  // Active data helper
  const activeData = PLANS_DATA[activeTab];

  return (
    <section
      className="py-12 bg-white font-sans relative overflow-hidden"
      id="plans"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-12 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-12">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
            Blueprints
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1e38] mb-8">
            Plans & <span className="text-[#C5A059]">Layouts</span>
          </h2>

          {/* TOGGLE SWITCH */}
          <div className="inline-flex bg-gray-100 p-1.5 rounded-full relative">
            {/* Sliding Background */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 bg-[#0a1e38] rounded-full shadow-md z-0"
              initial={false}
              animate={{
                x: activeTab === "master" ? 0 : "100%",
                width: "50%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              onClick={() => setActiveTab("master")}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 ${
                activeTab === "master"
                  ? "text-white"
                  : "text-gray-500 hover:text-[#0a1e38]"
              }`}
            >
              <Map className="w-4 h-4" /> Master Plan
            </button>
            <button
              onClick={() => setActiveTab("floor")}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 ${
                activeTab === "floor"
                  ? "text-white"
                  : "text-gray-500 hover:text-[#0a1e38]"
              }`}
            >
              <Home className="w-4 h-4" /> Floor Plan
            </button>
          </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: IMAGE VIEWER (Span 8) */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTab} // Triggers animation on switch
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-2xl cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <div className="aspect-[4/3] md:aspect-[16/9] relative w-full">
                <Image
                  src={activeData.src}
                  alt={activeData.title}
                  fill
                  className="object-contain p-4 md:p-8"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-[#0a1e38] font-bold uppercase text-xs tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all">
                  <Maximize className="w-4 h-4" /> Click to Expand
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: DETAILS SIDEBAR (Span 4) */}
          <div className="lg:col-span-4 bg-gray-50 border border-gray-100 rounded-3xl p-8 h-full flex flex-col justify-between">
            <motion.div
              key={`${activeTab}-text`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold text-[#0a1e38] mb-2">
                {activeData.title}
              </h3>
              <div className="w-12 h-1 bg-[#C5A059] mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {activeData.desc}
              </p>

              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Key Highlights
              </h4>
              <ul className="space-y-3 mb-8">
                {activeData.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-700 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Box - INTEGRATED MODAL */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <p className="text-xs text-gray-400 mb-4 uppercase tracking-wide">
                Get Detailed {activeData.label} PDF
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#0a1e38] hover:bg-[#C5A059] text-white font-bold py-3.5 rounded-xl uppercase text-xs tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <Download className="w-4 h-4" /> Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- LIGHTBOX MODAL (ZOOM) --- */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50">
              <X className="w-6 h-6" />
            </button>

            {/* Zoomed Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent close on image click
            >
              <Image
                src={activeData.src}
                alt={activeData.title}
                fill
                className="object-contain"
              />

              {/* Footer Info - INTEGRATED MODAL */}
              <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md p-4 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-[#0a1e38] font-bold">
                    {activeData.title}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    High Resolution Preview
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsZoomed(false); // Close zoom view first
                    setIsModalOpen(true); // Open form modal
                  }}
                  className="bg-[#C5A059] text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#b08d4b] transition-colors"
                >
                  Download PDF <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DOWNLOAD MODAL INTEGRATION --- */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProjectName="Sobha Ayana" // Context for the modal
      />
    </section>
  );
};

export default SobhaAyanaPlans;

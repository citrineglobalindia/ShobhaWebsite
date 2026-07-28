"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Ruler,
  Calendar,
  Home,
  ZoomIn,
  Download,
} from "lucide-react";

const OVERVIEW = [
  { label: "Land Area", value: "2.5 Acres", icon: Map },
  { label: "Structure", value: "3B + G + 18 Floors", icon: Building2 },
  { label: "Total Units", value: "207 Exclusive Units", icon: Home },
  { label: "Size Range", value: "1875 - 2550 Sq.Ft.", icon: Ruler },
  { label: "Possession", value: "2031*", icon: Calendar },
  { label: "Typology", value: "3, 3.5 & 4 BHK", icon: Home },
];

// Helper icon
import { Map } from "lucide-react";

const PLANS = {
  MASTER: {
    title: "Master Plan Layout",
    img: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769453733/mainpaln_fd4xng.jpg",
    desc: "A thoughtfully designed layout spread across 2.5 acres with 80% open space.",
  },
  FLOOR: {
    title: "Typical Floor Plan (4 BHK)",
    img: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769453733/masterplan_xpuj8r.jpg",
    desc: "Spacious 4 Bed Grande | SBA: 2570 Sq.Ft | Carpet: 1598 Sq.Ft.",
  },
};

const AltairDetails = () => {
  const [activeTab, setActiveTab] = useState("MASTER");
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setMagnifierPosition({
      x: Math.max(0, Math.min(x, 100)),
      y: Math.max(0, Math.min(y, 100)),
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-6 md:px-12 space-y-20">
        {/* --- PART 1: PROJECT OVERVIEW (BENTO GRID) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Text Info */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-4xl font-bold text-[#0a1e38]">
              Project Overview
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed text-justify">
              Nestled across 2.5 acres, Sobha Altair is an exclusive development
              designed for those who seek elegance. Located in the heart of
              Bangalore, it offers reputed schools, hospitals, and major IT
              parks within a 10-minute radius.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Location
                </p>
                <p className="text-[#0a1e38] font-bold">Sarjapur Road</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Status
                </p>
                <p className="text-[#C5A059] font-bold">Pre-Launch</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {OVERVIEW.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-[#C5A059]/30 transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-[#C5A059] mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">
                    {item.label}
                  </p>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- PART 2: MASTER & FLOOR PLANS --- */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl font-bold text-[#0a1e38]">
              Master & Floor Plans
            </h2>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {Object.keys(PLANS).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-2 rounded-md text-sm font-bold uppercase transition-all ${
                    activeTab === key
                      ? "bg-white text-[#0a1e38] shadow-sm"
                      : "text-gray-500 hover:text-[#0a1e38]"
                  }`}
                >
                  {key === "MASTER" ? "Master Plan" : "Floor Plan"}
                </button>
              ))}
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden group p-4 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col lg:flex-row gap-8 items-center"
              >
                {/* Plan Details */}
                <div className="lg:w-1/3 space-y-4">
                  <h3 className="text-2xl font-bold text-[#0a1e38]">
                    {PLANS[activeTab].title}
                  </h3>
                  <p className="text-gray-600">{PLANS[activeTab].desc}</p>
                  <button className="flex items-center gap-2 text-[#C5A059] font-bold text-sm uppercase tracking-wide hover:text-[#0a1e38] transition-colors mt-4">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </div>

                {/* Plan Image with Zoom */}
                <div
                  className="lg:w-2/3 relative cursor-crosshair w-full"
                  onMouseEnter={() => setShowMagnifier(true)}
                  onMouseLeave={() => setShowMagnifier(false)}
                  onMouseMove={handleMouseMove}
                >
                  <div
                    ref={imgRef}
                    className="relative aspect-video w-full bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                  >
                    <Image
                      src={PLANS[activeTab].img}
                      alt={PLANS[activeTab].title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Magnifier Lens */}
                  {showMagnifier && (
                    <div
                      className="absolute w-32 h-32 rounded-full border-4 border-white shadow-2xl pointer-events-none z-20 hidden lg:block bg-white"
                      style={{
                        top: `${magnifierPosition.y}%`,
                        left: `${magnifierPosition.x}%`,
                        transform: "translate(-50%, -50%)",
                        backgroundImage: `url('${PLANS[activeTab].img}')`,
                        backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
                        backgroundSize: "200%",
                      }}
                    />
                  )}
                  {/* Mobile Hint */}
                  <div className="absolute bottom-3 right-3 lg:hidden bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                    <ZoomIn className="w-3 h-3" /> Pinch to Zoom
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AltairDetails;

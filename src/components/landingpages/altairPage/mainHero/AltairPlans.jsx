"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ZoomIn, Maximize2, Map } from "lucide-react";

// --- PLAN DATA ---
// Using the specific images you provided in the prompt context
const PLANS = {
  MASTER: {
    id: "master",
    title: "Master Plan",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769453733/mainpaln_fd4xng.jpg", // Using uploaded Master Plan image
    details: "Expansive 2.5 Acres | 3 Towers | 80% Open Space",
  },
  FLOOR: {
    id: "floor",
    title: "Type A5 - 4 BHK Grande",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769453733/masterplan_xpuj8r.jpg", // Using uploaded Floor Plan image
    details: "SBA: 2570 Sq.Ft | Carpet: 1598 Sq.Ft | Wing 1",
  },
};

const AltairPlans = () => {
  const [activeTab, setActiveTab] = useState("MASTER");
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const currentPlan = PLANS[activeTab];

  // --- MAGNIFIER LOGIC ---
  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    // Calculate percentage position
    let xPerc = (x / width) * 100;
    let yPerc = (y / height) * 100;

    // Clamp values
    if (xPerc > 100) xPerc = 100;
    if (xPerc < 0) xPerc = 0;
    if (yPerc > 100) yPerc = 100;
    if (yPerc < 0) yPerc = 0;

    setMagnifierPosition({ x: xPerc, y: yPerc });
  };

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* --- HEADER & TABS --- */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em] block mb-2">
              Layouts & Configurations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1e38]">
              Project Plans
            </h2>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 p-1.5 rounded-lg">
            {Object.keys(PLANS).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === key
                    ? "bg-white text-[#0a1e38] shadow-md"
                    : "text-gray-500 hover:text-[#0a1e38]"
                }`}
              >
                {PLANS[key].title.split(" - ")[0]} {/* Show short title */}
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN PLAN VIEWER --- */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 md:p-8 relative overflow-hidden shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative flex flex-col items-center"
            >
              {/* Info Bar */}
              <div className="w-full flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-[#0a1e38]">
                    {currentPlan.title}
                  </h3>
                  <p className="text-sm text-[#C5A059] font-medium mt-1">
                    {currentPlan.details}
                  </p>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0a1e38] hover:text-[#C5A059] transition-colors border border-gray-300 px-4 py-2 rounded-sm hover:border-[#C5A059]">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>

              {/* Image Container with Zoom */}
              <div
                className="relative w-full max-w-4xl cursor-crosshair group"
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
                onMouseMove={handleMouseMove}
              >
                <div
                  ref={imgRef}
                  className="relative aspect-[16/9] w-full bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <Image
                    src={currentPlan.image}
                    alt={currentPlan.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Magnifier Lens */}
                {showMagnifier && (
                  <div
                    className="absolute w-40 h-40 rounded-full border-4 border-white shadow-2xl pointer-events-none z-20 hidden md:block"
                    style={{
                      top: `${magnifierPosition.y}%`,
                      left: `${magnifierPosition.x}%`,
                      transform: "translate(-50%, -50%)",
                      backgroundImage: `url('${currentPlan.image}')`,
                      backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
                      backgroundSize: "250%", // Zoom Level
                    }}
                  />
                )}

                {/* Mobile Hint */}
                <div className="absolute bottom-4 right-4 md:hidden bg-black/70 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2 backdrop-blur-sm">
                  <ZoomIn className="w-3 h-3" /> Pinch to Zoom
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- FOOTER NOTE --- */}
        <div className="mt-6 flex items-start gap-3 text-gray-400 text-xs max-w-3xl mx-auto text-center md:text-left">
          <Map className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Disclaimer: The plans shown are for representation purposes only.
            Furniture and fixtures shown in the layout are not part of the
            standard offering. Dimensions mentioned are approximate and subject
            to construction variances.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AltairPlans;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Trees,
  Dumbbell,
  Waves,
  Car,
  Maximize, // Added missing import
  X,
  Compass,
  Info,
} from "lucide-react";

// --- HOTSPOT DATA ---
const MAP_HOTSPOTS = [
  {
    id: 1,
    title: "Grand Entrance Gateway",
    category: "Entry/Exit",
    desc: "A majestic double-height archway providing a secure and grand welcome.",
    icon: Car,
    x: 22,
    y: 55,
  },
  {
    id: 2,
    title: "Central Courtyard",
    category: "Landscape",
    desc: "The heart of the township featuring the Bio Pond and meandering streams.",
    icon: Trees,
    x: 48,
    y: 42,
  },
  {
    id: 3,
    title: "Sports Arena",
    category: "Sports",
    desc: "Dedicated zone for Tennis, Basketball, and a Multi-purpose court.",
    icon: Dumbbell,
    x: 75,
    y: 52,
  },
  {
    id: 4,
    title: "Luxury Clubhouse",
    category: "Lifestyle",
    desc: "Overlooking the pool, featuring a grand lobby, gym, and party halls.",
    icon: Waves,
    x: 65,
    y: 80,
  },
  {
    id: 5,
    title: "Pet Park & Picnic Grove",
    category: "Nature",
    desc: "Secluded green zones for family picnics and pet recreation.",
    icon: Trees,
    x: 55,
    y: 65,
  },
];

const LEGEND_ITEMS = [
  "01. Residential Gateway",
  "07. Clubhouse Entry",
  "09. Bio Pond",
  "13. Multi-Sports Court",
  "18. Kid's Pool",
  "26. Skate Park",
  "28. Grand Clubhouse",
];

const MasterPlan = () => {
  const [activeSpot, setActiveSpot] = useState(null);
  const [showLegend, setShowLegend] = useState(false);

  return (
    <section
      className="py-20 bg-[#0a0a0a] text-white font-sans relative overflow-hidden"
      id="masterplan"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      <div className="max-w-8xl mx-auto px-4 md:px-12 relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em] block mb-3">
              Site Layout
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Master{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#F3E5AB]">
                Plan
              </span>
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-[#C5A059] rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Info className="w-4 h-4" /> {showLegend ? "Hide" : "View"} Legend
            </button>
          </div>
        </div>

        {/* --- MAP CONTAINER --- */}
        <div className="relative w-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl group">
          {/* Mobile Scroll Hint */}
          <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-gray-300 pointer-events-none flex items-center gap-2">
            <Maximize className="w-3 h-3" /> Pinch to Zoom / Drag
          </div>

          {/* Map Wrapper (Scrollable on Mobile) */}
          <div className="overflow-auto w-full h-[60vh] md:h-auto md:aspect-[16/9] relative scrollbar-hide">
            <div className="relative min-w-[800px] md:min-w-full h-full">
              {/* THE MAP IMAGE */}
              <Image
                src="https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769457109/map_z2fzid.png"
                alt="Sobha One World Master Plan"
                width={1920}
                height={1080}
                className="w-full h-full object-cover opacity-90"
                priority
              />

              {/* Overlay Gradient (Vignette) */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0a0a0a]/80 pointer-events-none" />

              {/* --- INTERACTIVE HOTSPOTS --- */}
              {MAP_HOTSPOTS.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() =>
                    setActiveSpot(activeSpot === spot.id ? null : spot.id)
                  }
                  // FIX: Changed from <button> to <div> with role="button" to avoid hydration error
                  role="button"
                  tabIndex={0}
                  className="absolute z-30 group/spot focus:outline-none cursor-pointer"
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                >
                  {/* Pulsing Rings */}
                  <span className="absolute -inset-2 rounded-full bg-[#C5A059] opacity-20 animate-ping" />
                  <span className="absolute -inset-4 rounded-full bg-[#C5A059] opacity-10 animate-pulse delay-75" />

                  {/* The Dot */}
                  <div
                    className={`
                    relative w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white shadow-lg transition-transform duration-300
                    ${
                      activeSpot === spot.id
                        ? "bg-[#C5A059] scale-125"
                        : "bg-[#0a0a0a] hover:scale-110 hover:bg-[#C5A059]"
                    }
                  `}
                  >
                    {activeSpot === spot.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                  </div>

                  {/* Tooltip Card (Desktop Hover / Click) */}
                  <AnimatePresence>
                    {activeSpot === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        // Prevent click on tooltip from closing it immediately if bubbling issues arise
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-64 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#C5A059]/30 p-4 rounded-xl text-left shadow-2xl z-40 cursor-auto"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <spot.icon className="w-3 h-3" /> {spot.category}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSpot(null);
                            }}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1">
                          {spot.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {spot.desc}
                        </p>

                        {/* Down Arrow */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#C5A059]/30" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Compass Rose */}
              <div className="absolute bottom-8 right-8 pointer-events-none opacity-50">
                <Compass className="w-12 h-12 text-white" />
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold">
                  N
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- LEGEND PANEL (Collapsible) --- */}
        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 overflow-hidden"
            >
              <div className="bg-[#111] border border-white/10 rounded-xl p-6 md:p-8">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                  Key Facilities
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {LEGEND_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MasterPlan;

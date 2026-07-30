"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trees, MapPin, ArrowUpRight, Waves, Wind, Leaf } from "lucide-react";

// --- DATA CONFIGURATION ---
const OVERVIEW_ITEMS = [
  {
    id: 1,
    type: "image",
    src: "/one-world/night-elevation.jpg", // Sobha One World night elevation
    title: "The Township",
    subtitle: "48 Acres of Paradise",
    size: "large", // Spans 2x2
  },
  {
    id: 2,
    type: "stat",
    icon: Leaf,
    value: "60%",
    label: "Open Green Spaces",
    desc: "Breathe pure air in a sanctuary designed for wellness.",
    size: "normal",
  },
  {
    id: 3,
    type: "image",
    // Sobha One World Zen courtyard
    src: "/one-world/zen-courtyard.jpg",
    title: "Eco-Luxe Living",
    subtitle: "Nature at your doorstep",
    size: "tall", // Spans 1x2 (Vertical)
  },
  {
    id: 4,
    type: "stat",
    icon: MapPin,
    value: "20 Min",
    label: "Drive to Whitefield",
    desc: "Seamless connectivity to Bangalore's IT Hub via STRR.",
    size: "normal",
  },
  {
    id: 5,
    type: "image",
    // Sobha One World Tranquillity Falls
    src: "/one-world/tranquillity-falls.jpg",
    title: "World-Class Club",
    subtitle: "40,000 Sq.ft of Leisure",
    size: "wide", // Spans 2x1
  },
];

const SobhaHoskoteOverview = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] text-white font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 md:px-12 relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em] block mb-4">
              Project Overview
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              A World Within <br />
              <span className="text-gray-500">A World.</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed text-right md:text-left">
            Experience the perfect balance of urban connectivity and natural
            serenity. Sobha One World is not just a home; it's a legacy.
          </p>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] gap-4">
          {OVERVIEW_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`
                relative group rounded-2xl overflow-hidden border border-white/5 bg-[#111]
                ${item.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
                ${item.size === "tall" ? "md:col-span-1 md:row-span-2" : ""}
                ${item.size === "wide" ? "md:col-span-2 md:row-span-1" : ""}
                ${item.size === "normal" ? "md:col-span-1 md:row-span-1" : ""}
              `}
            >
              {/* === RENDER: IMAGE CARD === */}
              {item.type === "image" && (
                <>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest mb-1 block">
                          {item.subtitle}
                        </span>
                        <h3 className="text-2xl font-bold text-white leading-none">
                          {item.title}
                        </h3>
                      </div>
                      <div className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* === RENDER: STAT CARD === */}
              {item.type === "stat" && (
                <div className="h-full flex flex-col justify-between p-6 hover:bg-[#C5A059]/10 transition-colors duration-500">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/5 rounded-full text-[#C5A059] border border-white/5 group-hover:border-[#C5A059] transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-[#C5A059] transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-4xl font-bold text-white mb-1">
                      {item.value}
                    </h3>
                    <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3">
                      {item.label}
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed border-t border-white/10 pt-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 border-2 border-[#C5A059] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM SCROLL HINT --- */}
        <div className="mt-16 flex justify-center">
          <div className="flex flex-col items-center gap-3 opacity-50">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#C5A059] to-transparent"></div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500">
              Amenities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobhaHoskoteOverview;

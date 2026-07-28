"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Leaf,
  Wind,
  Sun,
  MapPin,
  Building2,
  Layout,
  Waves,
  Utensils,
  Tent,
  Sparkles,
} from "lucide-react";

// --- DATA CONFIGURATION ---
const HIGHLIGHTS_DATA = [
  {
    id: 1,
    title: "Exclusive Luxury Living",
    tags: ["3 BHK Only", "Vaastu Compliant"],
    desc: "Sobha Ayana offers exclusive 3 BHK luxury apartments designed with thoughtfully planned Vaastu-compliant layouts. Experience the privacy and elegance of a community crafted for the discerning few.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454552/Living-Room_jqgxbq.jpg",
  },
  {
    id: 2,
    title: "Grand Arrival Experience",
    tags: ["Double-Height Lobbies", "Designer Areas"],
    desc: "Step into a world of grandeur with elegant double-height lobbies and designer common areas. Every corner reflects the premium resort-style ambience unique to Sobha Limited.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454552/Lobby_xqhovk.jpg",
  },
  {
    id: 3,
    title: "Tropical Paradise",
    tags: ["70-80% Open Space", "6.29 Acres"],
    desc: "Spread across 6.29 acres, the project features modern tropical-themed architecture. With 70–80% open green spaces, enjoy lush gardens, water features, and a true sanctuary in East Bengaluru.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454547/Dining-Room_xkoioi.jpg",
  },
  {
    id: 4,
    title: "Masterful Layout",
    tags: ["12 Towers", "B+G+14 Floors"],
    desc: "A total of 683 residences spread across 12 meticulously planned towers. The master plan ensures ample light, ventilation, and privacy for every home.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769458480/master_2_odaftf.png",
  },
  {
    id: 5,
    title: "Personal Sanctuaries",
    tags: ["Spacious Rooms", "Premium Finishes"],
    desc: "Retreat to master bedrooms that define comfort. High-quality finishes and expansive windows bring the tropical outdoors inside your private haven.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769454545/Master-Bedroom_euwqzj.jpg",
  },
];

const AMENITIES_LIST = [
  { icon: Waves, label: "Kids’ Pool & Wave Garden" },
  { icon: Building2, label: "Grand Clubhouse" },
  { icon: Wind, label: "Skating Rink" },
  { icon: Sun, label: "Cricket Pitch & Tennis" },
  { icon: Utensils, label: "Foodie Kiosk" },
  { icon: Leaf, label: "Canopy Trail & Bamboo Trek" },
  { icon: Layout, label: "Fruit Orchard" },
  { icon: Sparkles, label: "Fitness Plaza" },
  { icon: Tent, label: "Moon Garden" },
];

const SobhaAyanaJourney = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-white overflow-hidden font-sans"
    >
      {/* --- BACKGROUND DECOR --- */}
      {/* Central "Gold Thread" Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-100 transform md:-translate-x-1/2 z-0">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute top-0 left-0 w-full bg-[#C5A059] origin-top h-full"
        />
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-12 relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-20 md:mb-32">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
            Life at Ayana
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1e38]">
            A Tropical{" "}
            <span className="text-[#C5A059] italic font-serif">Journey</span>
          </h2>
        </div>

        {/* --- ZIG-ZAG HIGHLIGHTS --- */}
        <div className="flex flex-col gap-20 md:gap-32">
          {HIGHLIGHTS_DATA.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <TimelineItem
                key={item.id}
                item={item}
                isEven={isEven}
                index={index}
              />
            );
          })}
        </div>

        {/* --- AMENITIES SECTION (The Destination) --- */}
        <div className="mt-32 pt-16 border-t border-gray-100 relative bg-white">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-[#0a1e38] mb-4">
              Curated <span className="text-[#C5A059]">Amenities</span>
            </h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Designed to rejuvenate your senses, featuring nature-inspired
              zones and active lifestyle arenas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {AMENITIES_LIST.map((amenity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group flex flex-col items-center p-6 bg-gray-50 hover:bg-[#C5A059]/10 rounded-2xl transition-all duration-300 border border-transparent hover:border-[#C5A059]/30"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform text-[#C5A059]">
                  <amenity.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-700 text-center group-hover:text-[#0a1e38]">
                  {amenity.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: TIMELINE ROW ---
const TimelineItem = ({ item, isEven, index }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* --- IMAGE SIDE --- */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 relative group"
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Decorative Box Behind */}
        <div
          className={`absolute -bottom-4 -z-10 w-full h-full border border-[#C5A059]/30 rounded-2xl ${
            isEven ? "-left-4" : "-right-4"
          }`}
        />

        {/* Timeline Node (Center Dot) */}
        <div
          className={`
          hidden md:flex absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-4 border-[#C5A059] rounded-full items-center justify-center z-20 shadow-lg
          ${isEven ? "-right-[4.2rem]" : "-left-[4.2rem]"}
        `}
        >
          <span className="text-[#0a1e38] font-bold text-xs">{index + 1}</span>
        </div>
      </motion.div>

      {/* --- CONTENT SIDE --- */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full md:w-1/2 text-left pl-8 md:pl-0 border-l-2 md:border-l-0 border-gray-200 md:border-none"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-[#0a1e38] mb-4">
          {item.title}
        </h3>

        <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>

        {/* Mobile Connector Dot */}
        <div className="md:hidden absolute left-[-5px] w-2.5 h-2.5 bg-[#C5A059] rounded-full mt-[-6rem]" />
      </motion.div>
    </div>
  );
};

export default SobhaAyanaJourney;

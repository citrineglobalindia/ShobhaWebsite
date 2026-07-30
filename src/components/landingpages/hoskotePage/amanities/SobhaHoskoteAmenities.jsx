"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trees,
  Dumbbell,
  Droplets,
  Users,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Wifi,
  Sun,
  Download,
} from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";
// Ensure this path matches where you saved the DownloadModal component

// --- DATA: AMENITY CATEGORIES & ITEMS ---
const AMENITY_DATA = [
  {
    id: "nature",
    label: "Nature & Zen",
    icon: Trees,
    title: "6-Acre Urban Forest",
    desc: "Escape the city chaos in our Miyawaki-themed urban forest, featuring meditation pods, reflexology paths, and a dedicated bird-watching deck.",
    src: "/one-world/zen-courtyard.jpg",
    features: ["Miyawaki Forest", "Butterfly Park", "Reflexology Path"],
  },
  {
    id: "wellness",
    label: "Wellness Club",
    icon: Droplets,
    title: "The Aqua Zone",
    desc: "A sprawling 50m Olympic-length lap pool coupled with a therapeutic jacuzzi and a dedicated kids' splash arena.",
    src: "/one-world/tranquillity-falls.jpg",
    features: ["Olympic Lap Pool", "Jacuzzi Spa", "Kids Splash Pad"],
  },
  {
    id: "sports",
    label: "Active Life",
    icon: Dumbbell,
    title: "Pro-Sports Arena",
    desc: "Championship-grade tennis courts, a futsal turf, and a cricket pitch designed for the athlete in you.",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop",
    features: ["2 Tennis Courts", "Futsal Turf", "Cricket Pitch"],
  },
  {
    id: "social",
    label: "Social Hub",
    icon: Users,
    title: "Club Royale",
    desc: "A 40,000 sq.ft. clubhouse featuring a grand ballroom, co-working spaces, and a rooftop lounge for community gatherings.",
    src: "/one-world/night-elevation.jpg",
    features: ["Grand Ballroom", "Co-Working Space", "Rooftop Cafe"],
  },
  {
    id: "smart",
    label: "Smart Living",
    icon: Wifi,
    title: "Future-Ready Infra",
    desc: "Integrated with smart-home automation, EV charging stations in every block, and majestic 3-tier security systems.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769456859/play-area_gdudx7.webp",
    features: ["EV Charging", "Smart Access", "Fibre-to-Home"],
  },
];

const SobhaHoskoteAmenities = () => {
  const [activeTab, setActiveTab] = useState(AMENITY_DATA[0].id);

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find active data
  const activeContent = AMENITY_DATA.find((item) => item.id === activeTab);

  return (
    <section
      className="pb-12 bg-[#0a0a0a] text-white font-sans relative overflow-hidden"
      id="amenities"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-8xl mx-auto px-6 md:px-12 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-12 pt-12">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
            Lifestyle Upgrades
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Curated for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#F3E5AB]">
              Excellence
            </span>
          </h2>
        </div>

        {/* --- MAIN INTERFACE --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* --- LEFT: NAVIGATION LIST --- */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {AMENITY_DATA.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    group flex items-center justify-between p-6 rounded-xl border transition-all duration-300 relative overflow-hidden
                    ${
                      isActive
                        ? "bg-[#111] border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.1)]"
                        : "bg-transparent border-white/10 hover:border-white/30 hover:bg-white/5"
                    }
                  `}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#C5A059]"
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <div
                      className={`
                      p-2 rounded-lg transition-colors
                      ${
                        isActive
                          ? "text-[#C5A059] bg-[#C5A059]/10"
                          : "text-gray-400 group-hover:text-white"
                      }
                    `}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-sm md:text-base font-bold uppercase tracking-wider ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? "text-[#C5A059] rotate-0"
                        : "text-gray-600 -rotate-90 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* --- RIGHT: VISUAL SHOWCASE --- */}
          <div className="lg:w-2/3 relative h-[500px] lg:h-auto min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#111]"
              >
                {/* Main Image */}
                <Image
                  src={activeContent.src}
                  alt={activeContent.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent lg:w-1/2" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full lg:max-w-xl">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest">
                        Signature Feature
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {activeContent.title}
                    </h3>

                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 border-l-2 border-[#C5A059] pl-4">
                      {activeContent.desc}
                    </p>

                    {/* Features List */}
                    <div className="flex flex-wrap gap-3">
                      {activeContent.features.map((feat, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs text-white font-medium border border-white/10"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- BOTTOM CTA (Integrated with Modal) --- */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-[#C5A059] transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Amenities Brochure
            <div className="w-8 h-[1px] bg-white group-hover:bg-[#C5A059] group-hover:w-12 transition-all duration-300" />
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* --- RENDER MODAL --- */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProjectName="Sobha One World" // Set context for the modal
      />
    </section>
  );
};

export default SobhaHoskoteAmenities;
